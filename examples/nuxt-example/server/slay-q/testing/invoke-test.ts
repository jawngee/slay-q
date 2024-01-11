import { z } from "zod";
import { defineSlayQFunction } from "@slay-pics/slay-q";

export const InvokerTestEvent = z.object({
  testString: z.string(),
});

export const InvokeeTestEvent = z.object({
  testString: z.string(),
});

export const invokerTestEvent = defineSlayQFunction(
  {
    event: "testing/invoke-test",
    schema: InvokerTestEvent,
    invokes: ["testing/invokee-test"],
  },
  async ({ event, data, step }) => {
    console.log("invoking");
    const res = await step.invoke("invoke-step", "testing/invokee-test", {
      testString: data.testString,
    });

    console.log("invoke result", res);
  }
);

export const invokeeTestEvent = defineSlayQFunction(
  {
    event: "testing/invokee-test",
    schema: InvokeeTestEvent,
  },
  async ({ event, data, step }) => {
    return "nice stuff " + data.testString;
  }
);
