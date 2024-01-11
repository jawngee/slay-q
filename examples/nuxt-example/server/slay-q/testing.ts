import {z} from "zod";

import {waitsOnTestEvent, WaitsOnTestEvent} from "~/server/slay-q/testing/waits-on-test";
import {waitedForTestEvent, WaitedForTestEvent} from "~/server/slay-q/testing/waited-for-test";
import {type SlayQEmptyEventType} from "@slay-pics/slay-q";
import {invokeeTestEvent, InvokeeTestEvent, invokerTestEvent, InvokerTestEvent} from "~/server/slay-q/testing/invoke-test";
import {cancelOnTestEvent, CancelOnTestEvent} from "~/server/slay-q/testing/cancel-on-test";
import {cronTestEvent} from "~/server/slay-q/testing/cron-test";
import {sleepTestEvent} from "~/server/slay-q/testing/sleep-test";

export type TestingEvents = {
	"testing/waits-on-test": z.infer<typeof WaitsOnTestEvent>;
	"testing/waited-for-test": z.infer<typeof WaitedForTestEvent>;
	"testing/sleep-test": SlayQEmptyEventType,
	"testing/invoke-test": z.infer<typeof InvokerTestEvent>,
	"testing/invokee-test": z.infer<typeof InvokeeTestEvent>,
	"testing/cron-test": SlayQEmptyEventType,
	"testing/cancel-on-test": z.infer<typeof CancelOnTestEvent>,
};

export const TestingFunctions = [
	cancelOnTestEvent,
	cronTestEvent,
	invokerTestEvent,
	invokeeTestEvent,
	sleepTestEvent,
	waitedForTestEvent,
	waitsOnTestEvent
];