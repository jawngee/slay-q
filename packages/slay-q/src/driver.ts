import type {SlayQJobDefinition, SlayQRPCError} from "./types/rpc";

export interface SlayQDriver {
  addJob(jobDef: SlayQJobDefinition): Promise<SlayQRPCError | null>;

  triggerWaiting(event: string, match: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null>;

  triggerWaitingInvokers(jobKey: string, result: any | null): Promise<SlayQRPCError | null>;

  waitForEvent(
    jobKey: string,
    event: string,
    matchKey: string,
    matchValue: string | number | boolean,
    stepName: string,
    expiresAt: Date
  ): Promise<SlayQRPCError | null>;

  waitForInvocation(invokerJobKey: string, targetJobKey: string, stepName: string): Promise<SlayQRPCError | null>;

  cancelPendingTasks(event: string, matchKey: string, matchVal: string | number | boolean): Promise<SlayQRPCError | null>;
}
