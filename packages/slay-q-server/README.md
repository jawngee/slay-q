# Slay Q Server

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

This is the server component of [Slay Q](https://www.npmjs.com/package/@slay-pics/slay-q).

This is a thin wrapper around the super awesome [Graphile Worker](https://worker.graphile.org) which is doing all of the heavy lifting.

[Read the Docs](https://slayq-docs.vercel.app)

## Usage

Install package:

```sh
# npm
npm install @slay-pics/slay-q-server

# yarn
yarn add @slay-pics/slay-q-server

# pnpm
pnpm install @slay-pics/slay-q-server

# bun
bun install @slay-pics/slay-q-server
```

Run:

```bash
npx slay-q-server /path/to/slay-config.json
```

Run without installing:

```bash
npx @slay-pics/slay-q-server@latest /path/to/slay-config.json
```

## Requirements

* Postgres database

## Migrations
The first time you run the server, two migrations will be run:

* A schema and related tables called `graphile_worker` will be created.  This schema is required for Graphile Worker to function.
* A second schema and related tables/function called `slayq` will be created.  This contains all the tables and functions SlayQ
  needs to do its housekeeping.
* Additionally, a few functions will be created in the `public` schema.  This is necessary for Supabase as you cannot access other
  schemas with their js libs.

## Environment Variables
You must have a few environment variables defined prior to launching `slay-q-server`:

* `SLAY_Q_DATABASE_URL` - The connection string url for your postgres database.
* `SLAY_Q_SECRET` - The secret used to sign events posted to your app's slay-q receiver endpoint.
* `SLAY_Q_CRON_URL` - The URL to your slay-q receiver endpoint that will receive cron events.

## Configuration
To run `slay-q-server`, you need to create a config file first:

```json
{
  "queues": {
    "mail": {
      "concurrency": 4
    },
    "messaging": {
      "concurrency": 6,
      "alias": [
        "dispatch",
        "ready"
      ]
    },
    "interactions": {
      "concurrency": 1,
      "alias": [
        "reconcile",
        "discord"
      ]
    },
    "housekeeping": {
      "concurrency": 2
    },
    "profile": {
      "concurrency": 8
    },
    "general": {
      "concurrency": 10
    }
  }
}
```

We are essentially defining a variety of queues and their level of concurrency (the number of tasks that can run at once in the queue).
Additionally, we are specifying aliases for these queues.  These aliases are only provided to help keep things organized on the client
side of things.

## License

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@slay-pics/slay-q-server?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@slay-pics/slay-q-server
[npm-downloads-src]: https://img.shields.io/npm/dm/@slay-pics/slay-q-server?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@slay-pics/slay-q-server
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@slay-pics/slay-q-server/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/@slay-pics/slay-q-server
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@slay-pics/slay-q-server?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@slay-pics/slay-q-server
