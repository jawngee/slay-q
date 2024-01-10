import type { SlayQFunction } from "./function";
import type { SlayQCacheData } from "./types/cache";
import type { SlayQReceiveEventPayload } from "./types/events";
import { SlayQStepCache } from "./step-cache";
import { SlayQStep } from "./step";
import {
  SlayQDelayError,
  SlayQEventMissingError,
  SlayQInvalidSignatureError,
  SlayQInvokeEventError,
  SlayQNoRetryError,
  SlayQTimingError,
  SlayQWaitOnEventError,
} from "./types/errors";
import type { SlayQDriver } from "./driver";
import { SlayQCron } from "./cron";

import {addSeconds} from "@slay-pics/date-utils";
import {calcSig} from "@slay-pics/signature";
import shortUUID from "short-uuid";
import ms from "ms";

const translator = shortUUID(shortUUID.constants.flickrBase58, {
  consistentLength: false,
});

export type SlayQClientOptions = {
  endpoint: string;
  timeMultiplier?: number;
  driver: SlayQDriver;
  functions: SlayQFunction[];
};

export class SlayQClient<T> {
  private readonly _functionMap: Map<string, SlayQFunction>;
  private readonly _cancelsMap: Map<string, { event: string; match: string }[]>;
  private readonly _waitedForMap: Map<string, string[]>;
  private readonly _driver: SlayQDriver;
  private readonly _endpoint: string;
  private readonly _cron: SlayQCron = new SlayQCron();
  private readonly _invokeable: Set<string> = new Set();

  public readonly timeMultiplier: number;

  constructor(options: SlayQClientOptions) {
    this._driver = options.driver;
    this._endpoint = options.endpoint;
    this.timeMultiplier = options.timeMultiplier ?? 1;

    this._cancelsMap = new Map();
    this._waitedForMap = new Map();

    options.functions.forEach(fn => {
      if (fn.invokes) {
        fn.invokes.forEach(thing => this._invokeable.add(thing));
      }

      if (fn.cron) {
        this._cron.addCron(fn.cron, fn.event);
      }

      if (fn.cancelOn && fn.cancelOn.length > 0) {
        fn.cancelOn.forEach(cancel => {
          if (!this._cancelsMap.has(cancel.event)) {
            this._cancelsMap.set(cancel.event, []);
          }

          this._cancelsMap.get(cancel.event)!.push({
            event: fn.event,
            match: cancel.match,
          });
        });
      }

      if (fn.waitsOn && fn.waitsOn.length > 0) {
        fn.waitsOn.forEach(waitOn => {
          if (!this._waitedForMap.has(waitOn.event)) {
            this._waitedForMap.set(waitOn.event, []);
          }

          if (!this._waitedForMap.get(waitOn.event)!.includes(waitOn.match)) {
            this._waitedForMap.get(waitOn.event)!.push(waitOn.match);
          }
        });
      }
    });

    this._functionMap = new Map(options.functions.map(fn => [fn.event, fn]));
  }

  async cancelEvent<K extends Extract<keyof T, string>>(event: K, data: T[K]) {
    const cancels = this._cancelsMap.get(event);
    if (!cancels) {
      console.warn(`No cancel for ${event}`);
      return;
    }

    for (const cancel of cancels) {
      const matchVal = (<any>data).hasOwnProperty(cancel.match) ? (<any>data)[cancel.match] : null;
      if (!matchVal) {
        console.warn(`No value for ${cancel.match}`);
        continue;
      }

      await this._driver.cancelPendingTasks(cancel.event, cancel.match, matchVal);
    }
  }

  async sendEvent<K extends Extract<keyof T, string>>(
    event: K,
    data: T[K],
    delay: number | null = null,
    runAt: Date | null = null,
    cache: SlayQCacheData | null = null,
    customJobKey: string | null = null
  ) {
    if (this._cancelsMap.has(event)) {
      await this.cancelEvent(event, data);
    }

    await this.updateEvent(customJobKey ?? translator.generate(), event, data, delay, runAt, cache);
  }

  async sendEvents<K extends Extract<keyof T, string>>(events: { name: K; data: T[K] }[], batchSize: number = 8) {
    const eventsCopy = [...events];

    while (eventsCopy.length > 0) {
      const batch = eventsCopy.splice(0, batchSize);
      const promises = batch.map(e => this.sendEvent(e.name, e.data));
      await Promise.all(promises);
    }
  }

  async updateEvent<K extends Extract<keyof T, string>>(
    jobKey: string,
    event: K,
    data: T[K],
    delay: number | null = null,
    runAt: Date | null = null,
    cache: SlayQCacheData | null = null
  ) {
    if (!this._functionMap.has(event)) {
      throw new Error(`Event ${event} not found`);
    }

    const f = this._functionMap.get(event)!;
    if (!f.schema.safeParse(data).success) {
      throw new Error(`Event ${event} data does not match schema`);
    }

    const args: any = {};

    if (f.retries !== undefined && f.retries !== null) {
      args.max_attempts = f.retries + 1;
    }

    if (f.priority !== undefined) {
      args.priority = f.priority;
    }

    if (delay && delay > 0) {
      args.run_at = addSeconds(null, delay).toISOString();
    } else if (runAt) {
      args.run_at = runAt.toISOString();
    }

    const payload: any = {
      url: this._endpoint,
      retry: 0,
      event,
      data,
    };

    if (cache) {
      payload.cache = cache;
    }

    const error = await this._driver.addJob({
      identifier: f.queue ?? "general",
      job_key: jobKey,
      ...args,
      payload,
    });
    if (error) {
      console.error(error.message);
    }
  }

  async triggerWaitedFor<K extends Extract<keyof T, string>>(event: K, data: T[K]) {
    const waitMatches = this._waitedForMap.get(event);
    if (!waitMatches) {
      console.warn(`No wait matches for ${event}`);
      return;
    }

    for (const match of waitMatches) {
      const matchVal = (<any>data).hasOwnProperty(match) ? (<any>data)[match] : null;
      if (!matchVal) {
        console.warn(`No value for ${match}`);
        continue;
      }

      const error = await this._driver.triggerWaiting(event, match, matchVal);
      if (error) {
        console.error(error);
      }
    }
  }

  async invokeEvent<K extends Extract<keyof T, string>>(
    jobKey: string,
    event: K,
    data: T[K],
    cache: SlayQCacheData | null = null,
    retry: number = 0
  ) {
    if (event === "cron") {
      const events = this._cron.checkCron();
      if (events.length > 0) {
        await this.sendEvents(
          <any[]>events.map(event => {
            return {
              name: event,
              data: {},
            };
          })
        );
      }

      return;
    }

    if (!this._functionMap.has(event)) {
      throw new Error(`Event ${event} not found`);
    }

    const f = this._functionMap.get(event)!;
    if (!f.schema.safeParse(data).success) {
      throw new Error(`Event ${event} data does not match schema`);
    }

    const stepCache = new SlayQStepCache(cache);
    const step = new SlayQStep(stepCache, this);

    try {
      const result = await f.callback({
        event,
        data,
        step,
        retry,
      });

      if (this._waitedForMap.has(event)) {
        await this.triggerWaitedFor(event, data);
      }

      if (this._invokeable.has(event)) {
        const error = await this._driver.triggerWaitingInvokers(jobKey, result ?? null);
        if (error) {
          console.error(error.message);
        }
      }
    } catch (e) {
      if (e instanceof SlayQDelayError) {
        await this.updateEvent(jobKey, event, data, null, new Date(e.delay), stepCache.cache);
      } else if (e instanceof SlayQWaitOnEventError) {
        if (!f.waitsOn) {
          throw new Error("You are waiting for an event but haven't specified it in the waitsOn property of your function.");
        }

        const waitingEvent = e.event;
        const waitsOn = f.waitsOn.find(waitsOn => waitsOn.event === waitingEvent);
        if (!waitsOn) {
          throw new Error("You are waiting for an event but haven't specified it in the waitsOn property of your function.");
        }

        if (!(<any>data).hasOwnProperty(waitsOn.match)) {
          throw new Error("Invalid property specified for match on waitForEvent.");
        }
        const matchVal = `${(<any>data)[waitsOn.match]}`;

        const timeoutDate = new Date(Date.now() + ms(e.timeout));

        // update event to trigger on timeout date
        await this.updateEvent(jobKey, event, data, null, timeoutDate, stepCache.cache);

        // add the wait
        const error = await this._driver.waitForEvent(jobKey, e.event, waitsOn.match, matchVal, e.step, timeoutDate);
        if (error) {
          console.error(error.message);
        }
      } else if (e instanceof SlayQInvokeEventError) {
        if (!f.invokes || !f.invokes.includes(e.event)) {
          throw new Error("You are invoking a function that you haven't specified in your function's invoke property.");
        }

        const timeoutDate = new Date(Date.now() + ms(e.timeout));
        const invokeJobKey = translator.generate();
        await this.updateEvent(jobKey, event, data, null, timeoutDate, stepCache.cache);

        // add the wait
        const error = await this._driver.waitForInvocation(jobKey, invokeJobKey, e.step);
        if (error) {
          console.error(error.message);
        } else {
          await this.sendEvent(<K>e.event, e.data, null, null, null, invokeJobKey);
        }
      } else if (e instanceof SlayQNoRetryError) {
        // do nothing.
      } else {
        await this.updateEvent(jobKey, event, data, null, null, stepCache.cache);
      }
    }
  }

  async receiveEvent<K extends Extract<keyof T, string>>(sigHeader: string, payload: SlayQReceiveEventPayload) {
    if (payload.event !== "cron" && !this._functionMap.has(payload.event)) {
      throw new SlayQEventMissingError(`Event ${payload.event} not found`);
    }

    const calculateSig = calcSig(payload, process.env.SLAY_Q_WORKER_SECRET!);
    if (calculateSig !== sigHeader) {
      throw new SlayQInvalidSignatureError(`Event ${payload.event} has invalid signature`);
    }

    const timeDelta = new Date().getTime() - payload.time;
    if (timeDelta / 1000 > 15) {
      throw new SlayQTimingError(`Event ${payload.event} has invalid timestamp`);
    }

    await this.invokeEvent(payload.job_key, <K>payload.event, payload.data, payload.cache, payload.retry ?? 0);
  }
}
