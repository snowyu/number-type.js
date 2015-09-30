chai            = require 'chai'
sinon           = require 'sinon'
sinonChai       = require 'sinon-chai'
should          = chai.should()
expect          = chai.expect
assert          = chai.assert
chai.use(sinonChai)

setImmediate    = setImmediate || process.nextTick

NumberType      = require '../src/number-type'
NumberTest      = require './number'
floatTest       = require './float'


NumberTest NumberType, floatTest

