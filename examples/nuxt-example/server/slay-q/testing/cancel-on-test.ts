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
    console.log("running cancelable event", retry);
    await step.sleep('sleep-step', '3m');
    console.log("done sleeping", retry);
  }
);
