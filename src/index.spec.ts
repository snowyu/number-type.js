import { Type, NumberType, IntType, FloatType } from './index'

describe('number-type', () => {
  it('should have aliases', () => {
    expect(new Type(null, 'number')).toBeInstanceOf(NumberType)
    expect(new Type(null, 'int')).toBeInstanceOf(IntType)
    expect(new Type(null, 'integer')).toBeInstanceOf(IntType)
    expect(new Type(null, 'Integer')).toBeInstanceOf(IntType)
    expect(new Type(null, 'float')).toBeInstanceOf(FloatType)
    expect(new Type(null, 'real')).toBeInstanceOf(FloatType)
    expect(new Type(null, 'Real')).toBeInstanceOf(FloatType)
    expect(new Type(null, 'double')).toBeInstanceOf(FloatType)
    expect(new Type(null, 'Double')).toBeInstanceOf(FloatType)
  })
})
