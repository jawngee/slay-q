import { z } from "zod";
import {defineSlayQFunction, SlayQEmptyEvent} from "@slay-pics/slay-q";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sleepTestEvent = defineSlayQFunction(
  {
    event: "testing/sleep-test",
    schema: SlayQEmptyEvent,
  },
  async ({ event, data, step, retry }) => {
    console.log("retry", retry);

    const val = await step.run("first-step", async () => {
      console.log("first step - only run once");
      return "cool";
    });

    const val2 = await step.run("second-step", async () => {
      console.log("second step - only run once");
      return "world";
    });

    console.log("sleeping");
    await step.sleep("sleeping", "60s");
    console.log("sleep over");

    await step.run("third-step", async () => {
      console.log(val, val2);
    });
  }
);
