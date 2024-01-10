# @slay-pics/signature

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

Simple function to validate/verify a HMAC of a JS object with a secret.

## Usage

Install package:

```sh
# npm
npm install @slay-pics/signature

# yarn
yarn add @slay-pics/signature

# pnpm
pnpm install @slay-pics/signature

# bun
bun install @slay-pics/signature
```

Use:

```js
// ESM
import { calcSig } from "@slay-pics/signature";

// CommonJS
const { calcSig } = require("@slay-pics/signature");

const sig = calcSig({ some: 'object', with: 'props' }, process.env.YOUR_SECRET);
```

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
