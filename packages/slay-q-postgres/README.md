# @slay-pics/slay-q-postgres

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

Postgres driver for [Slay Q](https://www.npmjs.com/package/@slay-pics/slay-q).

## Usage

Install package:

```sh
# npm
npm install @slay-pics/slay-q @slay-pics/slay-q-postgres

# yarn
yarn add @slay-pics/slay-q @slay-pics/slay-q-postgres

# pnpm
pnpm install @slay-pics/slay-q @slay-pics/slay-q-postgres

# bun
bun install @slay-pics/slay-q @slay-pics/slay-q-postgres
```

## Environment Variables
You can configure the driver by passing in options to the constructor, or alternatively you can specify the following environment variables:

* `DATABASE_URL` - The database connection string url

Note that constructor options take precedents.


## License

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@slay-pics/slay-q-postgres?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@slay-pics/slay-q-postgres
[npm-downloads-src]: https://img.shields.io/npm/dm/@slay-pics/slay-q-postgres?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@slay-pics/slay-q-postgres
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@slay-pics/slay-q-postgres/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/@slay-pics/slay-q-postgres
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@slay-pics/slay-q-postgres?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@slay-pics/slay-q-postgres
