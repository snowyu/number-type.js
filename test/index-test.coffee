chai            = require 'chai'
sinon           = require 'sinon'
sinonChai       = require 'sinon-chai'
should          = chai.should()
expect          = chai.expect
assert          = chai.assert
chai.use(sinonChai)

setImmediate    = setImmediate || process.nextTick

Type        = require '../src'
NumberType  = require '../src/number-type'
IntType     = require '../src/int-type'
FloatType   = require '../src/float-type'

describe 'number-type', ->
  it 'should have aliases', ->
    expect(Type('number')).to.be.instanceOf NumberType
    expect(Type('int')).to.be.instanceOf IntType
    expect(Type('integer')).to.be.instanceOf IntType
    expect(Type('Integer')).to.be.instanceOf IntType
    expect(Type('float')).to.be.instanceOf FloatType
    expect(Type('real')).to.be.instanceOf FloatType
    expect(Type('Real')).to.be.instanceOf FloatType
    expect(Type('double')).to.be.instanceOf FloatType
    expect(Type('Double')).to.be.instanceOf FloatType



