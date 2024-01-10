import { z } from "zod";
import type {SlayQStep} from "./step";

export type SlayQFunctionCallback<T> = (event: { event: string; data: T; step: SlayQStep<any>; retry: number }) => Promise<any>;

export type SlayQOptions = {
  event: string;
  schema: z.ZodType;
  retries?: number;
  priority?: number;
  cron?: string;
  cancelOn?: { event: string; match: string }[];
  waitsOn?: { event: string; match: string }[];
  invokes?: string[];
  queue?: "mail" | "interactions" | "reconcile" | "messaging" | "housekeeping" | "dispatch" | "profile" | "general" | "ready";
};

export type SlayQFunction = SlayQOptions & {
  callback: SlayQFunctionCallback<any>;
};

export function defineSlayQFunction<T>(
  options: SlayQOptions,
  callback: SlayQFunctionCallback<z.infer<typeof options.schema>>
): SlayQFunction {
  return {
    cron: options.cron,
    event: options.event,
    schema: options.schema,
    retries: options.retries,
    queue: options.queue,
    invokes: options.invokes,
    priority: options.priority,
    cancelOn: options.cancelOn,
    waitsOn: options.waitsOn,
    callback,
  };
}
