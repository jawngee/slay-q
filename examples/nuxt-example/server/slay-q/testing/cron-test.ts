import { z } from "zod";
import {defineSlayQFunction, SlayQEmptyEvent} from "@slay-pics/slay-q";

export const cronTestEvent = defineSlayQFunction(
  {
    event: "testing/cron-test",
    cron: "*/2 * * * *",
    schema: SlayQEmptyEvent,
  },
  async ({ event, data, step, retry }) => {
    console.log("cron test", retry);
  }
);
