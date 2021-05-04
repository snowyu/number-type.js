import isInt from 'util-ex/lib/is/string/int'
import isInteger from 'util-ex/lib/is/type/integer'
import { AbstractNumberType } from './abstract-number-type'

export class IntType extends AbstractNumberType {
  static toValue(aString): number | undefined {
    if (isInt(aString)) {
      aString = parseInt(aString)
    } /* istanbul ignore else */ else if (!isInteger(aString)) {
      aString = undefined
    }
    return aString
  }

  _isValid(value) {
    return isInteger(value)
  }
}

AbstractNumberType.register(IntType, { aliases: ['int', 'Integer', 'integer'] })
