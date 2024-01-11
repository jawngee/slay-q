import { z } from "zod";
import { defineSlayQFunction } from "@slay-pics/slay-q";

export const CancelOnTestEvent = z.object({
  someDataId: z.string(),
});

export const cancelOnTestEvent = defineSlayQFunction(
  {
    event: "testing/cancel-on-test",
    schema: CancelOnTestEvent,
    cancelOn: [
      {
        event: "testing/cancel-on-test",
        match: "someDataId",
      },
    ],
  },
  async ({ event, data, step, retry }) => {
    console.log("cancel on test", retry);
    await step.sleep('sleep-one-day', '3m');
    console.log("never saw this", retry);
  }
);
