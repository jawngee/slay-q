export class SlayQDelayError extends Error {
  readonly delay: number;

  constructor(message: string, delay: number) {
    super(message);
    this.delay = delay;
  }
}

export class SlayQWaitOnEventError extends Error {
  readonly event: string;
  readonly timeout: string;
  readonly step: string;

  constructor(message: string, step: string, event: string, timeout: string) {
    super(message);
    this.event = event;
    this.timeout = timeout;
    this.step = step;
  }
}

export class SlayQInvokeEventError extends Error {
  readonly event: string;
  readonly step: string;
  readonly data: any;
  readonly timeout: string;

  constructor(message: string, step: string, event: string, data: any, timeout: string = "15m") {
    super(message);
    this.event = event;
    this.step = step;
    this.data = data;
    this.timeout = timeout;
  }
}

export class SlayQNoRetryError extends Error {}
export class SlayQEventMissingError extends Error {}
export class SlayQInvalidSignatureError extends Error {}
export class SlayQTimingError extends Error {}
