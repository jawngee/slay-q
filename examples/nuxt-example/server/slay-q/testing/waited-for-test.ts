import { z } from "zod";
import { defineSlayQFunction } from "@slay-pics/slay-q";

export const WaitedForTestEvent = z.object({
  waitingForId: z.string(),
});

export const waitedForTestEvent = defineSlayQFunction(
  {
    event: "testing/waited-for-test",
    schema: WaitedForTestEvent,
  },
  async ({ event, data, step }) => {
    console.log('triggering waited for event', data.waitingForId);
  }
);
