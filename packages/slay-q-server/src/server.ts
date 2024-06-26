import {httpHandler} from "./http-handler";
import {run} from "graphile-worker";
import {readFileSync} from "fs";
import {ConfigSchemaType} from "./types";
import {MigrationPlugin} from "./migration-plugin";

export async function server(configFile:string) {
	const configText = readFileSync(configFile).toString('utf-8');
	const config:ConfigSchemaType = JSON.parse(configText);

	const cronQueue = await run({
		connectionString: process.env.SLAY_Q_DATABASE_URL,
		maxPoolSize: 11,
		concurrency: 1,
		noHandleSignals: false,
		crontab: `* * * * * cronQueue ?max=1&jobKey=cron {url:"${process.env.SLAY_Q_CRON_URL!}",retry:0,event:"cron",data:{}}`,
		taskList: {
			cronQueue: httpHandler,
		},
		preset: {
			plugins: [ MigrationPlugin ],
		}
	});

	const promises = [cronQueue];
	for(const queue of Object.keys(config.queues)) {
		const taskList = {
			[queue]: httpHandler,
		};

		if (config.queues[queue].alias) {
			config.queues[queue].alias!.forEach(name => taskList[name] = httpHandler);
		}

		const newQueue = await run({
			connectionString: process.env.SLAY_Q_DATABASE_URL!,
			concurrency: config.queues[queue].concurrency,
			noHandleSignals: false,
			pollInterval: 1000,
			maxPoolSize: 11,
			taskList,
		});

		promises.push(newQueue);
	}

	await Promise.all(promises);
}
