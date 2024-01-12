import {SlayQClient} from "@slay-pics/slay-q";
import {type TestingEvents, TestingFunctions} from "~/server/slay-q/testing";
import {SlayQIngestRPCDriver} from "@slay-pics/slay-q-rpc";

const config = useRuntimeConfig();

type AllEvents = TestingEvents;

export const defaultSlayQClient = new SlayQClient<AllEvents>({
	driver: new SlayQIngestRPCDriver({
		endpointUrl: config.slayQRpcEndpoint,
		secret: config.slayQSecret,
	}),
	endpoint: config.slayQEndpoint,
	functions: [
		...TestingFunctions,
	],
});