import 'jest-extended'
import isFunction from 'util-ex/lib/is/type/function'

import { AbstractNumberType } from './abstract-number-type'

export function valueTests(NumberType: typeof AbstractNumberType) {
  describe('Value', () => {
    describe('.validate()', () => {
      const t = new NumberType({ min: 1, max: 10 })
      // beforeAll(() => {
      //   t = new NumberType({ min: 1, max: 10 })
      // })

      it('should validate a value and do not raise error', () => {
        expect(t.validate(2)).toEqual(true)
        expect(t.validate(0, false)).toEqual(false)
        expect(t.validate(11, false)).toEqual(false)
      })
      it('should validate a value and raise error', () => {
        expect(t.validate.bind(t, 0)).toThrow('is an invalid')
        expect(t.validate.bind(t, 11)).toThrow('is an invalid')
      })
      it('should validate an encoded value', () => {
        expect(t.validate('5')).toEqual(true)
      })
    })
  })
}

export function numberTest(NumberType: typeof AbstractNumberType, Tests?) {
  const number: any = new NumberType()

  describe(String(NumberType), () => {
    it('should be exist number type', () => {
      expect(number).toBeInstanceOf(NumberType)
      const expectPath = ['type', 'AbstractNumber']
      if (NumberType !== AbstractNumberType) expectPath.push(String(NumberType))
      expect(NumberType.pathArray()).toEqual(expectPath)
    })

    it('should create parameterized type', () => {
      class Positive extends NumberType {
        static min = 0
      }
      const result = new Positive(1)
      expect(result).toHaveProperty('min', 0)
      expect(result.isValid()).toBeTrue()
      expect(result.validate(-1, false)).toBeFalse()
    })

    describe('toValue', () => {
      it('should convert string to value', () => {
        const result = NumberType.toValue('123')
        expect(result).toStrictEqual(123)
      })
      it('should be undefined if string can not be converted to value', () => {
        const result = NumberType.toValue('zfs123')
        expect(result).toBeUndefined()
      })
      it('should be undefined if value can not be converted', () => {
        const result = NumberType.toValue({})
        expect(result).toBeUndefined()
      })
    })

    describe('range', () => {
      it('should not set the wrong range of number', () => {
        expect(() => new NumberType({ max: 'as' })).toThrow(
          'the max should be a ' + number.name
        )
        expect(() => new NumberType({ min: 'as' })).toThrow(
          'the min should be a ' + number.name
        )
        expect(() => new NumberType({ min: 4, max: 3 })).toThrow(
          'the max should be greater than min'
        )
        const v: any = new NumberType({ max: 3 })
        expect(() => (v.min = 4)).toThrow('the min should be less than max')

        const result = number.clone()
        result.max = 4
        expect(() => (result.min = 6)).toThrow(
          'the min should be less than max'
        )
      })
      it('should limit the range of number value', () => {
        const n: any = new NumberType({ min: '2', max: '6' })
        expect(n.min).toEqual(2)
        expect(n.max).toEqual(6)
        expect(n.validate(4)).toBeTrue()
        expect(n.validate(2)).toBeTrue()
        expect(n.validate(6)).toBeTrue()
        expect(n.validate.bind(n, 1)).toThrow('an invalid ' + number.name)
        expect(n.validate.bind(n, 7)).toThrow('an invalid ' + number.name)
        expect(n.isValid(0)).toBeFalse()
        expect(n.isValid(7)).toBeFalse()
      })
      it('should limit max number value', () => {
        const n = new NumberType({ max: 6 })
        expect(n.validate(1)).toBeTrue()
        expect(n.validate(4)).toBeTrue()
        expect(n.validate(2)).toBeTrue()
        expect(n.validate(6)).toBeTrue()
        expect(n.validate.bind(n, 7)).toThrow('an invalid ' + number.name)
        expect(n.isValid(0)).toBeTrue()
        expect(n.isValid(7)).toBeFalse()
        expect(n.isValid(8)).toBeFalse()
      })
      it('should limit min number value', () => {
        const n = new NumberType({ min: 2 })
        expect(n.validate(4)).toBeTrue()
        expect(n.validate(2)).toBeTrue()
        expect(n.validate(6)).toBeTrue()
        expect(n.validate(7)).toBeTrue()
        expect(n.validate.bind(n, 1)).toThrow('an invalid ' + number.name)
        expect(n.isValid(0)).toBeFalse()
        expect(n.isValid(-1)).toBeFalse()
      })
    })
    describe('.validate', () => {
      it('should validate string number value', () => {
        expect(number.validate('123')).toBeTrue()
        expect(number.validate.bind(number, 'dsd')).toThrow(
          'an invalid ' + number.name
        )
      })
    })
  })

  if (isFunction(Tests)) Tests(NumberType)
  valueTests(NumberType)
}

numberTest(AbstractNumberType)
