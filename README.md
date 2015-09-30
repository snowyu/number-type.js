## number-type [![npm][npm-svg]][npm]

[![Build Status][travis-svg]][travis]
[![Code Climate][codeclimate-svg]][codeclimate]
[![Test Coverage][codeclimate-test-svg]][codeclimate-test]
[![downloads][npm-download-svg]][npm]
[![license][npm-license-svg]][npm]

[npm]: https://npmjs.org/package/number-type
[npm-svg]: https://img.shields.io/npm/v/number-type.svg
[npm-download-svg]: https://img.shields.io/npm/dm/number-type.svg
[npm-license-svg]: https://img.shields.io/npm/l/number-type.svg
[travis-svg]: https://img.shields.io/travis/snowyu/number-type.js/master.svg
[travis]: http://travis-ci.org/snowyu/number-type.js
[codeclimate-svg]: https://codeclimate.com/github/snowyu/number-type.js/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/snowyu/number-type.js
[codeclimate-test-svg]: https://codeclimate.com/github/snowyu/number-type.js/badges/coverage.svg
[codeclimate-test]: https://codeclimate.com/github/snowyu/number-type.js/coverage


The number type.

## Usage

```js
var NumberType  = require('number-type')
var Number      = NumberType('number')
var Int         = NumberType('int')
var PositiveInt = Int.createType min:0

var n = PositiveInt.create(123)
console.log(1 + n)
//=124
console.log(n.isValid())
//=true
console.log(n.toJson()))
//='123'
console.log(n.toJson({withType:true})))
//='{"value":123,"name":"Int","min":0}'
console.log(PositiveInt.isValid(-1))
//=false
n.assign(-1)
//=TypeError: "-1" is an invalid Int
console.log(n.assign(2)+0)
//=2
```

## API


## TODO


## License

MIT
