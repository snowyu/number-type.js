import isInt from 'util-ex/lib/is/string/int'
import isFloat from 'util-ex/lib/is/string/float'
import isNumber from 'util-ex/lib/is/type/number'
import { AbstractNumberType } from './abstract-number-type'

export class NumberType extends AbstractNumberType {
  static toValue(aString): number | undefined {
    if (isInt(aString)) {
      aString = parseInt(aString)
    } else if (isFloat(aString)) {
      aString = parseFloat(aString)
    } /* istanbul ignore else */ else if (!isNumber(aString)) {
      aString = undefined
    }
    return aString
  }
  _isValid(value) {
    return isNumber(value)
  }
}

AbstractNumberType.register(NumberType, { alias: 'number' })
