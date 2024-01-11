// @ts-ignore
import { useValidatedBody } from "h3-zod";
import { SlayQReceiveEventPayloadSchema } from "@slay-pics/slay-q";
import useLogging from "~/utils/server/logging";
import useServerErrorHandler from "~/utils/server/server-error-handler";
import {defaultSlayQClient} from "~/server/slay-q/client";

export default defineEventHandler(async event => {
	const { logger } = useLogging(event);
	const { serverErrorHandler } = useServerErrorHandler();

	const sig = getHeader(event, "X-SlayQ-Signature");
	if (!sig) {
		serverErrorHandler(logger, event, 400, null, "Missing signature.");
		return;
	}

	const body = await useValidatedBody(event, SlayQReceiveEventPayloadSchema);
	await defaultSlayQClient.receiveEvent(sig, body);

	return {
		status: "ok",
	};
});
