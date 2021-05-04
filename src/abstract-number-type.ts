// import isInt from 'util-ex/lib/is/string/int'
// import isFloat from 'util-ex/lib/is/string/float'
import isNumber from 'util-ex/lib/is/type/number'
// import isString from 'util-ex/lib/is/type/string'
// import Attributes from 'abstract-type/lib/attributes'
import { Type, register, defineProperties } from 'abstract-type'

export class AbstractNumberType extends Type {
  static toValue(aValue): number | undefined {
    if (!isNaN(aValue)) aValue = Number(aValue)
    else aValue = undefined
    return aValue
  }

  // min!: number
  // max!: number

  // helper function to check the min property
  _validateMin(this: any, value) {
    if (typeof value === 'string') {
      const TheType = this['Class'] || this.constructor
      value = TheType.toValue(value)
    }
    if (!isNumber(value) || isNaN(value))
      throw new TypeError('the min should be a ' + this.name)
    if (value > this._max)
      throw new TypeError('the min should be less than max:' + value)
    return value
  }

  // helper function to check the max property
  _validateMax(this: any, value) {
    if (typeof value === 'string') {
      const TheType = this['Class'] || this.constructor
      value = TheType.toValue(value)
    }
    if (!isNumber(value) || isNaN(value))
      throw new TypeError('the max should be a ' + this.name)

    if (value < this._min)
      throw new TypeError('the max should be greater than min:' + value)
    return value
  }

  _isValid(value) {
    return isNumber(value)
  }

  _validate(aValue, aOptions) {
    const TheType = this['Class'] || this.constructor
    if (typeof aValue === 'string') aValue = TheType.toValue(aValue)
    let result = this._isValid(aValue)
    if (result) {
      const vMin = aOptions.min
      const vMax = aOptions.max
      if (vMin != null) {
        result = aValue >= vMin
        if (!result) {
          this.error('should be equal or greater than minimum value: ' + vMin)
        }
      }
      if (result && vMax != null) {
        result = aValue <= vMax
        if (result) {
          this.error('should be equal or less than maximum value: ' + vMax)
        }
      }
    }
    return result
  }
}

register(AbstractNumberType)

defineProperties(AbstractNumberType, {
  min: {
    type: 'Number',
    // the internal property name for min.
    assigned: '_min',
    assign(value, dest) {
      /* istanbul ignore else */
      if (dest instanceof AbstractNumberType) value = dest._validateMin(value)
      return value
    },
  },
  max: {
    type: 'Number',
    assigned: '_max',
    assign(value, dest) {
      /* istanbul ignore else */
      if (dest instanceof AbstractNumberType) value = dest._validateMax(value)
      return value
    },
  },
})
