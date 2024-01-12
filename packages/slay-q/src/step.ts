import ms from "ms";
import { SlayQDelayError, SlayQInvokeEventError, SlayQWaitOnEventError } from "./types/errors";
import type {SlayQStepCache} from "./step-cache";
import type {SlayQClient} from "./client";

export class SlayQStep<T> {
  private _client: SlayQClient<T>;
  private _stepCache: SlayQStepCache;

  constructor(runCache: SlayQStepCache, client: SlayQClient<T>) {
    this._stepCache = runCache;
    this._client = client;
  }

  async run(name: string, fn: () => Promise<any>) {
    if (this._stepCache.has(name)) {
      return this._stepCache.get(name);
    }

    const res = await fn();
    this._stepCache.set(name, res ?? null);

    return res;
  }

  async sendEvent<K extends Extract<keyof T, string>>(name: string, event: { name: K; data: T[K] }) {
    if (this._stepCache.has(name)) {
      return;
    }

    await this._client.sendEvent(event.name, event.data);

    this._stepCache.set(name, true);
  }

  async sendEvents<K extends Extract<keyof T, string>>(name: string, events: { name: K; data: T[K] }[]) {
    if (this._stepCache.has(name)) {
      return;
    }

    await this._client.sendEvents(events);

    this._stepCache.set(name, true);
  }

  async sleep(name: string, duration: string) {
    if (this._stepCache.has(name)) {
      return;
    }

    const time = Date.now() + ms(duration) * this._client.timeMultiplier;
    this._stepCache.set(name, true);

    throw new SlayQDelayError("Sleep", time);
  }

  async sleepUntil(name: string, date: string|Date) {
    if (this._stepCache.has(name)) {
      return;
    }

		if (typeof date === "string") {
			date = new Date(date);
		}

    this._stepCache.set(name, true);

    throw new SlayQDelayError("Sleep", date.getTime());
  }

  async waitForEvent(name: string, event: string, timeout: string) {
    if (this._stepCache.has(name)) {
      return !!this._stepCache.get(name);
    }

    this._stepCache.set(name, false);

    throw new SlayQWaitOnEventError("Wait", name, event, timeout);
  }

  async invoke(name: string, event: string, data: any, timeout: string = '15m'): Promise<any> {
    if (this._stepCache.has(name)) {
      return this._stepCache.get(name);
    }

    this._stepCache.set(name, null);

    throw new SlayQInvokeEventError("Invoke", name, event, data, timeout);
  }
}
