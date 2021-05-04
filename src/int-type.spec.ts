import 'jest-extended'

import { numberTest } from './abstract-number-type.spec'
import { IntType } from './int-type'

numberTest(IntType, (NumberType) => {
  const number = new NumberType()
  it('float number should be an invalid integer', () => {
    expect(() => new NumberType(1.2)).toThrow('an invalid ' + number.name)
    expect(number.isValid('1.23')).toBeFalse()
  })
})
