import {SlayQDriver, SlayQJobDefinition, SlayQRPCError} from "@slay-pics/slay-q";
import pg from "pg";

const { Pool } = pg;

export class SlayQPostgresDriver implements SlayQDriver {
	private readonly _pg;
	constructor(options: {
		connectionUrl?: string
	}) {
		const connectionUrl = options.connectionUrl ?? process.env.DATABASE_URL;
		if (!connectionUrl) {
			throw new Error("Missing required database connection url.");
		}

		this._pg = new Pool({
			connectionString: connectionUrl
		});
	}

	async addJob(jobDef: SlayQJobDefinition): Promise<SlayQRPCError | null> {
		try {
			await this._pg.query("select add_worker_job($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
				jobDef.identifier,
				jobDef.payload,
				jobDef.queue_name ?? null,
				jobDef.run_at ?? null,
				jobDef.max_attempts ?? null,
				jobDef.job_key ?? null,
				jobDef.priority ?? null,
				jobDef.flags ?? null,
				jobDef.job_key_mode ?? null
			]);

			return null;
		} catch (e:any) {
			return { message: e.message ?? 'Error adding job.'};
		}
	}

	async cancelPendingTasks(event: string, matchKey: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null> {
		try {
			await this._pg.query("select cancel_pending_tasks($1, $2, $3)", [
				event,
				matchKey,
				`${matchVal}`,
			]);

			return null;
		} catch (e:any) {
			return { message: e.message ?? 'Error cancelling tasks.'};
		}
	}

	async triggerWaiting(event: string, match: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null> {
		try {
			await this._pg.query("select trigger_waiting_workers($1, $2, $3)", [
				event,
				match,
				`${matchVal}`,
			]);

			return null;
		} catch (e:any) {
			return { message: e.message ?? 'Error triggering waiting.'};
		}
	}

	async triggerWaitingInvokers(jobKey: string, result: any): Promise<SlayQRPCError | null> {
		try {
			console.log(result);

			await this._pg.query("select trigger_waiting_invoker($1, $2)", [
				jobKey,
				JSON.stringify(result),
			]);

			return null;
		} catch (e:any) {
			return { message: e.message ?? 'Error triggering waiting invokers.'};
		}
	}

	async waitForEvent(jobKey: string, event: string, matchKey: string, matchValue: string | number | boolean, stepName: string, expiresAt: Date): Promise<SlayQRPCError | null> {
		try {
			await this._pg.query("select wait_for_worker_event($1, $2, $3, $4, $5, $6)", [
				jobKey,
				event,
				matchKey,
				`${matchValue}`,
				stepName,
				expiresAt.toISOString(),
			]);

			return null;
		} catch (e:any) {
			return { message: e.message ?? 'Error waiting for worker event.'};
		}
	}

	async waitForInvocation(invokerJobKey: string, targetJobKey: string, stepName: string): Promise<SlayQRPCError | null> {
		try {
			await this._pg.query("select wait_for_invocation($1, $2, $3)", [
				invokerJobKey,
				targetJobKey,
				stepName,
			]);

			return null;
		} catch (e:any) {
			return { message: e.message ?? 'Error waiting for invocation.'};
		}
	}

}
