import useLogging from "~/utils/server/logging";
import {defaultSlayQClient} from "~/server/slay-q/client";

export default defineEventHandler(async (event) => {
	const {logger} = useLogging(event);

	logger.profile('total execution time');

	await defaultSlayQClient.sendEvent('testing/cancel-on-test', {
		someDataId: '12'
	});

	logger.profile('total execution time');
	return {
		status: 'ok'
	};
});