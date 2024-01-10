import parser from "cron-parser";

export class SlayQCron {
  private readonly _cron: { next: number; interval: any; event: string }[] = [];

  addCron(cron: string, event: string) {
    let interval: parser.CronExpression;
    if (cron.toUpperCase().startsWith("TZ=")) {
      const parts = cron.split(" ");
      if (parts.length <= 1) {
        throw new Error("Invalid cron");
      }

      const tz = parts.shift()!.substring(3);
      const actualCron = parts.join(" ");

      interval = parser.parseExpression(actualCron, { tz });
    } else {
      interval = parser.parseExpression(cron);
    }

    this._cron.push({
      next: interval.next().getTime(),
      interval,
      event,
    });
  }

  checkCron(): string[] {
    const result = [];
    const now = Date.now();

    for (const cron of this._cron) {
      if (now >= cron.next) {
        result.push(cron.event);
        cron.next = cron.interval.next().getTime();
      }
    }

    return result;
  }
}
