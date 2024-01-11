import { GraphileConfig } from "graphile-config";
import {PromiseOrDirect} from "graphile-worker";
import {migrations} from "./migrations";

export const MigrationPlugin: GraphileConfig.Plugin = {
	name: "Migration Plugin",
	version: "1.0",
	worker: {
		hooks: {
			async postmigrate(ctx, event: GraphileWorker.MigrateEvent) {
				const res = await event.client.query("select exists(select from pg_tables where schemaname = 'slayq' and tablename = '_migrations')");

				let hasMigrations = false;
				if (res.rowCount && res.rowCount > 0 && res.rows[0].exists) {
					ctx.logger.info(`SlayQ migrations table exists.`);
					hasMigrations = true;
				} else {
					ctx.logger.warn('SlayQ migrations table does not exist.')
				}

				const allKeys = Object.keys(migrations).toSorted((a:string, b:string) => {
					return a.localeCompare(b);
				});

				for(const key of allKeys) {
					if (hasMigrations) {
						const res = await event.client.query(`select * from slayq._migrations where migration = '${key}'`);
						if (res.rowCount && res.rowCount > 0) {
							ctx.logger.info(`Migration ${key} exists.  Continuing.`);
							continue;
						}
					}

					ctx.logger.info(`Running migration '${key}'`);
					await event.client.query((<any>migrations)[key]);
					await event.client.query(`insert into slayq._migrations(migration) values ('${key}')`);
					hasMigrations = true;
				}

				ctx.logger.info('Done running SlayQ migrations.');
			},
		}
	}
}
