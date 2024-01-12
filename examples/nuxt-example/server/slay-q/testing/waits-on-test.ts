import { z } from "zod";
import { defineSlayQFunction } from "@slay-pics/slay-q";

export const WaitsOnTestEvent = z.object({
  waitingForId: z.string(),
});

export const waitsOnTestEvent = defineSlayQFunction(
  {
    event: "testing/waits-on-test",
    schema: WaitsOnTestEvent,
    waitsOn: [{ event: "testing/waited-for-test", match: "waitingForId" }],
  },
  async ({ event, data, step }) => {
    const step1val = await step.run("step-1-val", async () => {
      console.log('step 1 - run once');
      return 12;
    });

    const step2val = await step.run("step-2-val", async () => {
      console.log('step 2 - run once');
      return 'nice';
    });

    console.log("waiting ...");
    const result = await step.waitForEvent("waiting-for-something", "testing/waited-for-test", "2m");
    if (!result) {
      console.log("event did not fire.");
    } else {
      console.log("event did fire.");
    }

    console.log(`done waiting ... ${step1val} ${step2val}`);
  }
);
