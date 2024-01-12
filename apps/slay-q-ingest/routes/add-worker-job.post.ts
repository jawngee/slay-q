import {useValidatedBody} from "h3-zod";
import useLogging from "../utils/logging";
import useServerErrorHandler from "../utils/server-error-handler";
import {SlayQJobDefinitionSchema} from "@slay-pics/slay-q";
import {validateRequest} from "../utils/validate-request";
import {SlayQJobDefinition} from "@slay-pics/slay-q";
import {defaultRPCClient} from "../utils/default-rpc-client";

export default defineEventHandler(async (event) => {
	const {logger} = useLogging(event);
	const {serverErrorHandler} = useServerErrorHandler();
	const config = useRuntimeConfig(event);

	const isValid = await validateRequest(event);
	if (!isValid) {
		serverErrorHandler(logger, event, 401, null, "Not authorized.");
		return;
	}

	const body = await useValidatedBody(event, SlayQJobDefinitionSchema);

	const error = await defaultRPCClient.addJob(<SlayQJobDefinition>body);
	if (error) {
		serverErrorHandler(logger, event, 500, null, error.message);
		return;
	}

	return {
		status: 'ok'
	};
});
