import {defineCommand, runMain} from "citty";
import {existsSync} from "fs";
import * as dotenv from "dotenv";
import {server} from "./server";
import pg from 'pg';
const { Client } = pg;

dotenv.config();

const mainCommand = defineCommand({
	meta: {
		name: "Slay Q Server",
		version: "1.0.0",
		description: "Graphile based Inngest wannabe"
	},
	args: {
		configFile: {
			type: "positional",
			description: "Relative or absolute path to config file",
			required: true
		}
	},
	async run({args }) {
		if (!process.env.SLAY_Q_DATABASE_URL) {
			console.error('Missing required environment variable SLAY_Q_DATABASE_URL');
			process.exit(1);
		}

		let configFileRealPath = args.configFile;
		if (!existsSync(configFileRealPath)) {
			configFileRealPath = process.cwd()+'/'+args.configFile;
			if (!existsSync(configFileRealPath)) {
				console.error("Unable to find slay-config.json");
				process.exit(1);
			}
		}

		if (!process.env.SLAY_Q_SECRET) {
			console.error("Missing SLAY_Q_SECRET environment variable.");
			process.exit(1);
		}

		if (!process.env.SLAY_Q_CRON_URL) {
			console.error("Missing SLAY_Q_CRON_URL environment variable.");
			process.exit(1);
		}

		server(configFileRealPath).catch((err) => {
			console.error(err);
			process.exit(1);
		});

	},
})

export function run() {
	runMain(mainCommand).catch(err => {
		console.error(err);
		process.exit(1);
	});
}
