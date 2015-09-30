isInt           = require 'util-ex/lib/is/string/int'
isFloat         = require 'util-ex/lib/is/string/float'
isNumber        = require 'util-ex/lib/is/type/number'
isString        = require 'util-ex/lib/is/type/string'
Attributes      = require 'abstract-type/lib/attributes'
Type            = require 'abstract-type'
register        = Type.register

module.exports = class AbstractNumberType
  register AbstractNumberType

  constructor: ->
    return super

  $attributes: Attributes
    min:
      type: 'Number'
      assigned: '_min' # the internal property name for min.
      assign: (value, dest)->
        value = dest.validateMin(value) if dest instanceof AbstractNumberType
        value
    max:
      type: 'Number'
      assigned: '_max'
      assign: (value, dest)->
        value = dest.validateMax(value) if dest instanceof AbstractNumberType
        value

  #@stringToValue:-> #must be overrided this method!

  validateMin: (value)->
    throw new TypeError 'the min should be less than max:' + value if value > @_max
    value = @stringToValue(value) if isString value
    throw new TypeError 'the min should be a '+ @name unless isNumber value
    value
  validateMax: (value)->
    throw new TypeError 'the max should be greater than min:' + value if value < @_min
    value = @stringToValue(value) if isString value
    throw new TypeError 'the max should be a ' + @name unless isNumber value
    value
  _isValid: (value)-> isNumber value
  _validate: (aValue, aOptions)->
    aValue = @stringToValue(aValue) if isString aValue
    result = @_isValid aValue
    if result
      if aOptions
        vMin = aOptions.min
        vMax = aOptions.max
        if vMin?
          result = aValue >= vMin
          if not result
            @error 'should be equal or greater than minimum value: ' + vMin
        if result and vMax?
          result = aValue <= vMax
          if not result
            @error 'should be equal or less than maximum value: ' + vMax
    result
