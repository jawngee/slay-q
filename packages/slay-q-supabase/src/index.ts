import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {SlayQDriver, SlayQJobDefinition, SlayQRPCError} from "@slay-pics/slay-q";

export class SlayQSupabaseDriver<T> implements SlayQDriver {
	private readonly _client: SupabaseClient<T>;

	constructor(options: {
		supabaseUrl?: string,
		supabaseServiceKey?: string,
	} = {}) {
		const url = options.supabaseUrl ?? process.env.SUPABASE_URL;
		if (!url) {
			throw new Error("Missing required supabase url.");
		}

		const key = options.supabaseServiceKey ?? process.env.SUPABASE_SERVICE_KEY;
		if (!key) {
			throw new Error("Missing required supabase service key.");
		}

		this._client = createClient<T>(url, key);
	}

	async addJob(jobDef: SlayQJobDefinition): Promise<SlayQRPCError | null> {
		const { error } = await this._client.rpc("add_worker_job", jobDef);
		return error;
	}

	async triggerWaiting(event: string, match: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null> {
		const { error } = await this._client.rpc("trigger_waiting_workers", {
			_event: event,
			_match_key: match,
			_match_value: `${matchVal}`,
		});

		return error;
	}

	async triggerWaitingInvokers(jobKey: string, result: any | null): Promise<SlayQRPCError | null> {
		const { error } = await this._client.rpc("trigger_waiting_invoker", {
			_job_key: jobKey,
			_result: result ?? null,
		});

		return error;
	}

	async waitForEvent(
		jobKey: string,
		event: string,
		matchKey: string,
		matchValue: string | number | boolean,
		stepName: string,
		expiresAt: Date
	): Promise<SlayQRPCError | null> {
		const { error } = await this._client.rpc("wait_for_worker_event", {
			_job_key: jobKey,
			_event: event,
			_match_key: matchKey,
			_match_value: `${matchValue}`,
			_step_name: stepName,
			_expires_at: expiresAt.toISOString(),
		});

		return error;
	}

	async waitForInvocation(invokerJobKey: string, targetJobKey: string, stepName: string): Promise<SlayQRPCError | null> {
		const { error } = await this._client.rpc("wait_for_invocation", {
			_invoker_job_key: invokerJobKey,
			_target_job_key: targetJobKey,
			_step_name: stepName,
		});

		return error;
	}

	async cancelPendingTasks(event: string, matchKey: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null> {
		const { error } = await this._client.rpc("cancel_pending_tasks", {
			event,
			matchkey: matchKey,
			matchval: `${matchVal}`,
		});

		return error;
	}
}
