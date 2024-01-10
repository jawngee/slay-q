# Slay Q

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

Slay Q is a queue and background job management system inspired by [Inngest](https://inngest.com).  It's in production use on [Slay](https://slay.pics/)
for managing all of our media processing, notifications and other services.

It uses Graphile Workers on the backend (see Slay Q Server for details) and this client adds the Inngest-esque workflow stuff on top.

* Define multi-step branching workflows
* Implements Inngest's `sleep`, `sleepUntil`, `invoke`, `waitFoEvent` and `sendEvent` steps features with some minor differences.
* Enough similarity with Inngest that porting to and from Slay Q is fairly trivial
* We process 1 million+ events in our dev environment per month on a fairly cheap DigitalOcean droplet.
* Does not store event history like Inngest

## Requirements

* Postgres Database (we use Supabase at Slay)
* Droplet to run the [Slay Q Server](https://www.npmjs.com/package/@slay-pics/slay-q-server)
* Sunglasses because you can't be this cool without them

## Usage

Install package:

```sh
# npm
npm install @slay-pics/slay-q

# yarn
yarn add @slay-pics/slay-q

# pnpm
pnpm install @slay-pics/slay-q

# bun
bun install @slay-pics/slay-q
```

### Write a Function/Job
The key unit of Slay Q is an event which is represented as a function.  Each event/function is made up of individual steps.  When
Slay Q executes a function it caches the output of each step so that if one should fail, and the function is retried, the steps
before the failure don't need to be re-run.

To create a function, simply call the `defineSlayQFunction` function and specify some metadata about the function and the function's
body.

Here's an example:

```js
import { z } from "zod";
import { defineSlayQFunction } from "@slay-pics/slay-q";

// Each function has data that can be passed to it,
// this is the schema for that data.
export const TextFunctionEvent = z.object({
  testString: z.string(),
});

// The test event
export const testEvent = defineSlayQFunction(
  {
    event: "test/event",
    schema: TextFunctionEvent,
  },
  async ({ event, data, step, retry }) => {
    console.log("retry", retry);

    const val = await step.run("first-step", async () => {
      console.log("first step");
      return "hello";
    });

    const val2 = await step.run("second-step", async () => {
      console.log("second step");
      return "world";
    });

    const val3 = await step.run("third-step", async () => {
      if (retry === 1) {
        throw new Error("Yoinks.");
      }

      return data.testString;
    });

    console.log(`${val} ${val2} ${val3}`);
  }
);
```

In this example the function is composed of three different steps.  On the first run of the function step 3 will explode.  However,
Slay Q will cache the output of the previous two steps so that when it requeues the event to run again, those steps won't run as
their values have already been computed.

Each step must have a unique name, Slay Q will refuse to run it if they don't.  If you are running steps in a for-loop, for example,
you'll need to make sure the step name is different on each iteration by appending a counter to the name.

### Step Types
Each function workflow is composed of steps and there are a variety of types of steps you can use to build your workflows.

These are mostly the same as Inngest, but there are some differences.

#### step.run(name, handler)
This step runs a chunk of code (see above for an example).

#### step.sleep(name, duration)
This step will sleep the function for a given duration.  The duration can be specified using strings like `5m`,  `3 years`, etc.
See [ms](https://www.npmjs.com/package/ms) for more examples.

```js
export const someEvent = defineSlayQFunction(
  {
    event: "test/event",
    schema: SlayQEmptyEvent,
  },
  async ({ event, data, step, retry }) => {
    const val = await step.run("first-step", async () => {
      console.log("first step");
      return "hello";
    });

    await step.sleep('hush-baby', '1 year');

    const val2 = await step.run("second-step", async () => {
      console.log("second step");
      return "world";
    });

    console.log(`${val} ${val2}`);
  }
);
```

#### step.sleepUntil(name, date)
This step will sleep the function until a specific date.  The date can be a javascript Date object or a string.

```js
export const someEvent = defineSlayQFunction(
  {
    event: "test/event",
    schema: SlayQEmptyEvent,
  },
  async ({ event, data, step, retry }) => {
    const val = await step.run("first-step", async () => {
      console.log("first step");
      return "hello";
    });

    await step.sleepUntil('hang-on', '1/1/2025');

    const val2 = await step.run("second-step", async () => {
      console.log("second step");
      return "world";
    });

    console.log(`${val} ${val2}`);
  }
);
```

#### step.waitForEvent(name, event, timeout)
This step will pause execution until a matching event has been run.  This functions works the same as Inngest, but you have to do
an extra step.

```js
export const waitsOnTestEvent = defineSlayQFunction(
  {
    event: "testing/waits-on-test",
    schema: WaitsOnTestEvent,
    waitsOn: [{ event: "testing/waited-for-test", match: "waitingForId" }],
  },
  async ({ event, data, step }) => {
    const step1val = await step.run("step-1-val", async () => 12);
    const step2val = await step.run("step-2-val", async () => "cool");

    console.log("waiting ...");
    const result = await step.waitForEvent("waiting-for-something", "testing/waited-for-test", "2m");
    if (!result) {
      console.log("event did not fire.");
    } else {
      console.log("event did fire.");
    }

    console.log("done waiting ...");
  }
);
```
The difference here, from Inngest, is that you need to declare that the function will wait on another one at some point in the function's
`waitsOn` metadata.  Also, you can only match on a single property of the event's data.  Slay Q doesn't support CEL expressions like
Inngest does.

#### step.invoke(name, event, data, [timeout])
The step will invoke another event and wait for it to return a result, optionally waiting for the specified `timeout` period.  This
one is super juicy.

```js
export const testCallerEvent = defineSlayQFunction(
  {
    event: "test/caller",
    schema: SlayQEmptyEvent,
    invokes: ['test/callee']
  },
  async ({ event, data, step, retry }) => {
    const val = await step.run("first-step", async () => {
      console.log("first step");
      return "hello";
    });

    const val2 = await step.invoke('yo', 'test/callee', {}, '5m');
    if (!val2) {
      console.warn('nobody home');
      return;
    }

    console.log(`${val} ${val2}`);
  }
);

export const testCalleeEvent = defineSlayQFunction(
  {
    event: "test/callee",
    schema: SlayQEmptyEvent,
  },
  async ({ event, data, step, retry }) => {
    return 'world';
  }
);
```

In this example, when the `testCallerEvent` is invoked, Slay Q will dispatch an event to the `testCalleeEvent` and then return
that response.  Note that `testCalleeEvent` is not invoked directly, it is called just like any other event would be called.  So
if you are running in a serverless environment like Vercel or AWS Lambda then it's possible `testCalleeEvent` is running on a
totally different server.

> Like `waitForEvent`, you need to mark that this function will invoke another by specifying which event or events it invokes in the
function's `invokes` metadata.

#### step.sendEvent(name, event) / step.sendEvents(name, events)
This will simply dispatch another event (or multiple events) and continue processing the function.

### Function metadata
When creating a function, you will need to specify some metadata about it.

#### `event`
This is the name of the event that is triggering the function.  This is completely arbitrary but it must be unique amongst all
of your functions.  We use the form `group/subgroup/verb` such as `media/avatar/process` but it's completely up to you.

#### `schema`
This is a `zod` schema for the data that is being passed to the function.  If you don't have any data, you can use the `SlayQEmptyEvent`
schema.

This schema is used to give runtime checking when receiving and event, and is also used to infer types in the type system.

#### `queue?`
This is the name of the queue that processes these events.  When you run `slay-q-server` you define queues and their corresponding
concurrencies in a `slay-config.json` file.  This name should match up to one of the names specified in the `queue` section of
that config file.  The default value for this is `general`.  If you don't specify a queue on the function and you haven't specified
a queue named `general` in your server config these events will end up in limbo.

#### `retries?`
This is the number of times to retry this function before giving up.  The default is 25.

#### `priority?`
This is the priority of the function.  This priority is reversed so that a priority of 0 is the highest.

#### `cron?`
Specifying this value will run the function on the specified schedule.  This is a standard [crontab](https://crontab.guru) string.

You can prefix this string with `TZ=<Timezone string>` to force a timezone.  For example, to make sure a function runs every
day at 3am in Singapore, you'd specify the cron as `TZ=Asia/Singapore 0 3 * * *`.

> Note that crontab functions cannot have data schemas, so use the `SlayQEmptyEvent` schema.  Otherwise, it will error out every
> time.

`cancelOn?`
This is a list of conditions that can cancel this event.

```js
export const CancelOnTestEvent = z.object({
  someDataId: z.string(),
});

export const cancelOnTest = defineSlayQFunction({
    event: "testing/cancel-on-test",
    schema: CancelOnTestEvent,
    cancelOn: [{
      event: "testing/cancel-on-test",
      match: "someDataId",
    }],
  },
  async ({ event, data, step, retry }) => {
    console.log("cancel on test", retry);
    step.sleep('so-tired', '8h');
    console.log('and we are back');
  }
);
```
In this example, this function can cancel itself.  You'll notice that it sleeps for 8 hours in the middle of the function.  Should
whatever system generate another event with the same matching `someDataId` then that will cancel the previous sleeping function
with that same `someDataId` value.

#### `waitsOn?` and `invokes?`
See the `step.waitForEvent` and `step.invoke` above for more info.

### Create a Client
In order to dispatch or receive events in whatever stack you are working with, you'll need to create a client.  Here's an example:

```js
import { SlayQClient } from "@slay-pics/slay-q";

import { sleepTestEvent, type SleepTestEvent } from "~/server/slay-q/testing/sleep-test";
import { cronTestEvent, type CronTestEvent } from "~/server/slay-q/testing/cron-test";
import { cancelOnTest, type CancelOnTestEvent } from "~/server/slay-q/testing/cancel-on-test";

export type TestingEvents = {
  "testing/sleep-test": z.infer<typeof SleepTestEvent>;
  "testing/cron-test": z.infer<typeof CronTestEvent>;
  "testing/cancel-on-test": z.infer<typeof CancelOnTestEvent>;
};

export const TestingFunctions = [
  sleepTestEvent,
  cronTestEvent,
  cancelOnTest,
];

export const defaultSlayQClient = new SlayQClient<TestingEvents>({
  driver: new SlayQSupabaseDriver(),
  endpoint: "http://localhost/api/slay-q",
  functions: [
    ...TestingFunctions,
  ],
});
```
There's a bit to unpack here.

First we are creating a `TestingEvents` type that maps an event to the event's data type (inferred from the event's data's schema).
This type is then passed to the SlayQClient so that any calls to `sendEvent` are typed.

Second thing we are doing is creating a `const` called `Testing Functions` that is just an array of all of our testing functions.  It
seems silly to do it for just 3 functions, but when this gets larger and you're pulling in functions for different parts of your app,
you'll want to keep this as organized and neat as possible.  We have 180+ functions in use on Slay.

The `endpoint` is where `slay-q-server` can callback to when it has an event for your app to process.  Obviously this should be
specified with configuration or environment variables.

The `driver` is the interface with the database that the client will use.  Slay Q required Postgres, but we use Supabase exclusively,
so we've only included a driver for that.  You must have `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` environment variables defined.

### Dispatch Events
Once you've created the client, dispatching events is easy:

```js
await defaultSlayQClient.sendEvent("products/video-product/unlocked", {
  videoProductId: videoProduct.id,
  profileId: profile.id,
  userId: profile.user_id,
});
```
In this example, we're dispatching an unlocked event for a video product with the associated data needed for the event.

### Receiving Events
This is where it will get trickier because this part is dependent entirely on whatever stack or backend you are using.  For us,
that is [Nuxt](https://nuxt.com/).

We create a nitrojs handler at `/api/slay-q/index.post.ts` that looks like:

```js
// @ts-ignore
import { useValidatedBody } from "h3-zod";
import { createError, H3Event, sendError } from "h3";
import { SlayQReceiveEventPayloadSchema } from "@slay-pics/slay-q";
import { defaultSlayQClient } from "~/lib/slay-q/default-slay-q-client";

export default defineEventHandler(async event => {
  const sig = getHeader(event, "X-SlayQ-Signature");
  if (!sig) {
    sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid signature' }));
    return;
  }

  const body = await useValidatedBody(event, SlayQReceiveEventPayloadSchema);

  await defaultSlayQClient.receiveEvent(sig, body);

  return {
    status: "ok",
  };
});
```
First we get the `X-SlayQ-Signature` header which contains the signature of the request.  Note that you will need to have the
environment variable `SLAY_Q_WORKER_SECRET` defined in your `.env` or wherever you are specifying environment variables.

We then fetch the body of the request (as a parsed JSON object) with `useValidatedBody`.  We've passed in the
`SlayQReceiveEventPayloadSchema` schema to validate the payload against.

We then call the `receiveEvent` method on the SlayQClient instance which handles the rest.

This should be pretty easy to adapt other frameworks.

### Running the Server
See the [`slay-q-server`](https://www.npmjs.com/package/@slay-pics/slay-q-server) package for more details on running the server, which is a **requirement**.

## To Do

- [ ] Docs site
- [ ] Better types.  Right now only `sendEvent` on the client is typed really, but man I really dislike typescript.
- [ ] Tests
- [ ] Example Nuxt app

## License
Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@slay-pics/slay-q?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@slay-pics/slay-q
[npm-downloads-src]: https://img.shields.io/npm/dm/@slay-pics/slay-q?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@slay-pics/slay-q
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@slay-pics/slay-q/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/@slay-pics/slay-q
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@slay-pics/slay-q?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@slay-pics/slay-q
