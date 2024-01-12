import {ofetch} from "ofetch/node";
import {calcSig} from "@slay-pics/signature";
import {SlayQDriver, SlayQJobDefinition, SlayQRPCError} from "@slay-pics/slay-q";

export class SlayQIngestRPCDriver<T> implements SlayQDriver {
	private readonly _secret:string;
	private readonly _endpointUrl:string;

	constructor(options: {
		endpointUrl?: string,
		secret?: string,
	} = {}) {
		const secret = options.secret ?? process.env.SLAY_Q_WORKER_SECRET;
		if (!secret) {
			throw new Error("Missing required secret.");
		}

		const endpointUrl = options.endpointUrl ?? process.env.SLAY_Q_INGEST_ENDPOINT;
		if (!endpointUrl) {
			throw new Error("Missing endpoint url.");
		}

		this._secret = secret;
		this._endpointUrl = endpointUrl;
	}

	private async sendRequest(task: string, data:any) : Promise<SlayQRPCError | null> {
		try {
			const sig = calcSig(data, this._secret);
			await ofetch(this._endpointUrl + "/" + task, {
				method: "POST",
				headers: {
					'X-SlayQ-Signature': sig
				},
				body: data
			});

			return null;
		} catch (e:any) {
			console.error(e);
			return { message: e.message ?? "Unknown Error" };
		}
	}


	async addJob(jobDef: SlayQJobDefinition): Promise<SlayQRPCError | null> {
		return await this.sendRequest("add-worker-job", jobDef);
	}

	async triggerWaiting(event: string, match: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null> {
		return await this.sendRequest("trigger-waiting-workers", {
			event,
			match,
			matchVal: `${matchVal}`,
		});
	}

	async triggerWaitingInvokers(jobKey: string, result: any | null): Promise<SlayQRPCError | null> {
		return await this.sendRequest("trigger-waiting-invoker", {
			jobKey: jobKey,
			result: result ?? null,
		});
	}

	async waitForEvent(
		jobKey: string,
		event: string,
		matchKey: string,
		matchValue: string | number | boolean,
		stepName: string,
		expiresAt: Date
	): Promise<SlayQRPCError | null> {
		return await this.sendRequest("wait-for-worker-event", {
			jobKey,
			event,
			matchKey,
			matchValue: `${matchValue}`,
			stepName,
			expiresAt: expiresAt.toISOString(),
		});
	}

	async waitForInvocation(invokerJobKey: string, targetJobKey: string, stepName: string): Promise<SlayQRPCError | null> {
		return await this.sendRequest("wait-for-invocation", {
			invokerJobKey,
			targetJobKey,
			stepName,
		});
	}

	async cancelPendingTasks(event: string, matchKey: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null> {
		return await this.sendRequest("cancel-pending-tasks", {
			event,
			matchKey,
			matchVal: `${matchVal}`,
		});
	}
}
