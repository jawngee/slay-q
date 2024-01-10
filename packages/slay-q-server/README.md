# Slay Q Server

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

This is the server component of [Slay Q](https://www.npmjs.com/package/@slay-pics/slay-q).

This is a thin wrapper around [Graphile Worker](https://worker.graphile.org) which is doing all of the heavy lifting.

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

## Requirements

* Postgres database

## Migrations
You must run the SQL migrations in the migrations folder against your database.  Slay Q provides some additional functionality on
top of Graphile Worker that requires additional database tables and stored procedures to be installed.

## Configuration
To run slay-q-server, you need to create a config file first:

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

[npm-version-src]: https://img.shields.io/npm/v/packageName?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/packageName
[npm-downloads-src]: https://img.shields.io/npm/dm/packageName?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/packageName
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/packageName/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/packageName
[bundle-src]: https://img.shields.io/bundlephobia/minzip/packageName?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=packageName
