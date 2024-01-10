import {z} from "zod";
import {JobHelpers} from "graphile-worker";
import {calcSig} from "@slay/signature";

const PayloadSchema = z.object({
	url: z.string().url(),
	retry: z.number(),
	event: z.string(),
	data: z.any().optional(),
	cache: z.any().optional()
});

export async function httpHandler(payload:any, helpers:JobHelpers) {
	const validPayload = PayloadSchema.safeParse(payload);
	if (!validPayload.success) {
		console.log(payload);
		console.error("Invalid payload");
		return;
	}

	const data = {
		job_key: helpers.job.key ?? 'cron',
		retry: helpers.job.attempts,
		time: new Date().getTime(),
		event: payload.event,
		data: payload.data,
		cache: payload.cache,
	};

	const sig = calcSig(data, process.env.SLAY_Q_SECRET!);

	const res = await fetch(payload.url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-SlayQ-Signature": sig
		},
		body: JSON.stringify(data)
	});

	if ([200, 666, 404].includes(res.status)) {
		return;
	}

	throw new Error("Error: " + res.status + " " + res.statusText);
}
