chai            = require 'chai'
sinon           = require 'sinon'
sinonChai       = require 'sinon-chai'
should          = chai.should()
expect          = chai.expect
assert          = chai.assert
chai.use(sinonChai)

setImmediate    = setImmediate || process.nextTick
isFunction      = require 'util-ex/lib/is/type/function'

module.exports = (NumberType)->
  number = NumberType()
  describe 'float', ->
    describe 'range', ->
      it 'should not set the wrong range of number', ->
        expect(number.createType.bind(number, max:'as')).to.be.throw 'the max should be a '+ number.name
        expect(number.createType.bind(number, min:'as')).to.be.throw 'the min should be a '+ number.name
        expect(number.createType.bind(number, min:4.1, max:3.2)).to.be.throw 'the max should be greater than min'
        result = number.clone()
        try
          result.max = 5.1
          result.min = 6.3
        catch e
          err = e
        expect(err).to.be.exist
        expect(err.message).to.be.include 'the min should be less than max'
      it 'should limit the range of number value', ->
        n = number.createType(min: '2.23', max:'6.11')
        expect(n.min).to.be.equal 2.23
        expect(n.max).to.be.equal 6.11
        expect(n.validate(4.1)).to.be.true
        expect(n.validate(2.23)).to.be.true
        expect(n.validate(6.1)).to.be.true
        expect(n.validate.bind(n,1.1)).to.be.throw 'an invalid ' + number.name
        expect(n.validate.bind(n,6.12)).to.be.throw 'an invalid ' + number.name
        expect(n.isValid(0)).to.be.false
        expect(n.isValid(7)).to.be.false
      it 'should limit max number value', ->
        n = number.createType(max:6.3)
        expect(n.validate(0.1)).to.be.true
        expect(n.validate(4.1)).to.be.true
        expect(n.validate(2)).to.be.true
        expect(n.validate(6)).to.be.true
        expect(n.validate.bind(n,7)).to.be.throw 'an invalid ' + number.name
        expect(n.isValid(0)).to.be.true
        expect(n.isValid(7)).to.be.false
        expect(n.isValid(8)).to.be.false
      it 'should limit min number value', ->
        n = number.createType(min: 2.1)
        expect(n.validate(4)).to.be.true
        expect(n.validate(2.1)).to.be.true
        expect(n.validate(6)).to.be.true
        expect(n.validate(7.2)).to.be.true
        expect(n.validate.bind(n,1)).to.be.throw 'an invalid ' + number.name
        expect(n.isValid(0)).to.be.false
        expect(n.isValid(-1.1)).to.be.false

    describe '.validate', ->
      it 'should validate string number value', ->
        expect(number.validate('123e3')).to.be.true
        expect(number.validate.bind(number,"dsd")).to.be.throw 'an invalid ' + number.name

