import isFloat from 'util-ex/lib/is/string/float'
import isNumber from 'util-ex/lib/is/type/number'
import { AbstractNumberType } from './abstract-number-type'

export class FloatType extends AbstractNumberType {
  static toValue(aString): number | undefined {
    if (isFloat(aString)) {
      aString = parseFloat(aString)
    } /* istanbul ignore else */ else if (!isNumber(aString)) {
      aString = undefined
    }
    return aString
  }
}

AbstractNumberType.register(FloatType, {
  aliases: ['float', 'real', 'Real', 'double', 'Double'],
})
