import {useValidatedBody, z} from "h3-zod";
import useLogging from "../utils/logging";
import useServerErrorHandler from "../utils/server-error-handler";
import {validateRequest} from "../utils/validate-request";
import {defaultRPCClient} from "../utils/default-rpc-client";

export default defineEventHandler(async (event) => {
	const {logger} = useLogging(event);
	const {serverErrorHandler} = useServerErrorHandler();

	const isValid = await validateRequest(event);
	if (!isValid) {
		serverErrorHandler(logger, event, 401, null, "Not authorized.");
		return;
	}

	const body = await useValidatedBody(event, z.object({
		event: z.string(),
		matchKey: z.string(),
		matchVal: z.string(),
	}));

	const error = await defaultRPCClient.cancelPendingTasks(body.event, body.matchKey, body.matchVal);
	if (error) {
		serverErrorHandler(logger, event, 500, null, error.message);
		return;
	}

	return {
		status: 'ok'
	};
});
