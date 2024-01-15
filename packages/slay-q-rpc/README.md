# @slay-pics/slay-q-rpc

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

Driver for `slay-q-ingest` RPC server.  See [Slay Q](https://www.npmjs.com/package/@slay-pics/slay-q) for more info.

[Read the Docs](https://slayq-docs.vercel.app)

## Usage

Install package:

```sh
# npm
npm install @slay-pics/slay-q @slay-pics/slay-q-rpc

# yarn
yarn add @slay-pics/slay-q @slay-pics/slay-q-rpc

# pnpm
pnpm install @slay-pics/slay-q @slay-pics/slay-q-rpc

# bun
bun install @slay-pics/slay-q @slay-pics/slay-q-rpc
```

## Environment Variables
You can configure the driver by passing in options to the constructor, or alternatively you can specify the following environment variables:

* `SLAY_Q_WORKER_SECRET` - Shared secret used to validate RPC requests
* `SLAY_Q_INGEST_ENDPOINT` - URL to the slay-q ingest endpoint

Note that constructor options take precedents.


## License

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@slay-pics/slay-q-rpc?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@slay-pics/slay-q-rpc
[npm-downloads-src]: https://img.shields.io/npm/dm/@slay-pics/slay-q-rpc?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@slay-pics/slay-q-rpc
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@slay-pics/slay-q-rpc/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/@slay-pics/slay-q-rpc
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@slay-pics/slay-q-rpc?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@slay-pics/slay-q-rpc
