import useLogging from "~/utils/server/logging";
import {defaultSlayQClient} from "~/server/slay-q/client";

export default defineEventHandler(async (event) => {
	const {logger} = useLogging(event);

	logger.profile('total execution time');

	await defaultSlayQClient.sendEvent('testing/waited-for-test', {
		waitingForId: 'cool'
	});

	logger.profile('total execution time');
	return {
		status: 'ok'
	};
});