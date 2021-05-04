import 'jest-extended'

import { numberTest } from './abstract-number-type.spec'
import { FloatType } from './float-type'

export function floatTests(NumberType) {
  const number = new NumberType()
  describe('float', function () {
    describe('range', () => {
      it('should not set the wrong range of number', () => {
        expect(() => new NumberType({ max: 'as' })).toThrow(
          'the max should be a ' + number.name
        )
        expect(() => new NumberType({ min: 'as' })).toThrow(
          'the min should be a ' + number.name
        )
        expect(() => new NumberType({ min: 4.1, max: 3.2 })).toThrow(
          'the max should be greater than min'
        )
        const v = new NumberType({ max: 3.1 })
        expect(() => (v.min = 4.2)).toThrow('the min should be less than max')
      })
      it('should limit the range of number value', () => {
        const n = new NumberType({ min: '2.23', max: '6.11' })
        expect(n.min).toEqual(2.23)
        expect(n.max).toEqual(6.11)
        expect(n.validate(4.1)).toBeTrue()
        expect(n.validate(2.25)).toBeTrue()
        expect(n.validate(6.1)).toBeTrue()
        expect(n.validate.bind(n, 1.1)).toThrow('an invalid ' + number.name)
        expect(n.validate.bind(n, 6.12)).toThrow('an invalid ' + number.name)
        expect(n.isValid(0)).toBeFalse()
        expect(n.isValid(7)).toBeFalse()
      })
      it('should limit max number value', () => {
        const n = new NumberType({ max: 6.3 })
        expect(n.validate(0.1)).toBeTrue()
        expect(n.validate(4.1)).toBeTrue()
        expect(n.validate(2)).toBeTrue()
        expect(n.validate(6)).toBeTrue()
        expect(n.validate.bind(n, 7)).toThrow('an invalid ' + number.name)
        expect(n.isValid(0)).toBeTrue()
        expect(n.isValid(7)).toBeFalse()
        expect(n.isValid(8)).toBeFalse()
      })
      it('should limit min number value', () => {
        const n = new NumberType({ min: 2.1 })
        expect(n.validate(4)).toBeTrue()
        expect(n.validate(2.1)).toBeTrue()
        expect(n.validate(6)).toBeTrue()
        expect(n.validate(7.2)).toBeTrue()
        expect(n.validate.bind(n, 1)).toThrow('an invalid ' + number.name)
        expect(n.isValid(0)).toBeFalse()
        expect(n.isValid(-1.1)).toBeFalse()
      })
    })
    describe('.validate', () => {
      it('should validate string number value', () => {
        expect(number.validate('123e3')).toBeTrue()
        expect(number.validate.bind(number, 'dsd')).toThrow(
          'an invalid ' + number.name
        )
      })
    })
  })
}

numberTest(FloatType, floatTests)
