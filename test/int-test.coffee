chai            = require 'chai'
sinon           = require 'sinon'
sinonChai       = require 'sinon-chai'
should          = chai.should()
expect          = chai.expect
assert          = chai.assert
chai.use(sinonChai)

setImmediate    = setImmediate || process.nextTick

NumberType      = require '../src/int-type'
NumberTest      = require './number'


NumberTest NumberType, ->
  number = NumberType()
  it 'float number should be an invalid integer', ->
    expect(number.validate.bind(number, 1.2)).to.be.throw 'an invalid ' + number.name
    expect(number.isValid('1.23')).to.be.false

