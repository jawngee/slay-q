# @slay-pics/date-utils

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

A handful of date utilities used on [Slay](https://slay.pics).

## Usage

Install package:

```sh
# npm
npm install @slay-pics/date-utils

# yarn
yarn add @slay-pics/date-utils

# pnpm
pnpm install @slay-pics/date-utils

# bun
bun install @slay-pics/date-utils
```

## Usage

* `addYears(date, amount)`
* `addMonths(date, amount)`
* `addDays(date, amount)`
* `addHours(date, amount)`
* `addMinutes(date, amount)`
* `addSeconds(date, amount)`

Adds the specified amount of units to a date.  Date can be a string, a JS date or null.  If null is passed, then the current date
is used.

* `isPast(date)`
* `isFuture(date)`

Determines if the given date occurs in the past or future.

* `isWithinYears(date, amount)`
* `isWithinMonths(date, amount)`
* `isWithinDays(date, amount)`
* `isWithinHours(date, amount)`
* `isWithinMinutes(date, amount)`
* `isWithinSeconds(date, amount)`

Determines if the specified date is within the given range of the current date.

* `dayDiff(date1, date2)`

Returns the difference between two dates in days

* `thisMonth(date)`

Returns a date that is the 1st day of the month of the specified date.

* `previousMonth(date)`

Returns a date that is the 1st day of the prior month of the specified date.

* `nextMonth(date)`

Returns a date that is the 1st day of the next month of the specified date.

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
