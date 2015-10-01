isInt           = require 'util-ex/lib/is/string/int'
isFloat         = require 'util-ex/lib/is/string/float'
isNumber        = require 'util-ex/lib/is/type/number'
AbstractNumber  = require './'
register        = AbstractNumber.register
aliases         = AbstractNumber.aliases

module.exports = class FloatType
  register FloatType
  aliases FloatType, 'float', 'real', 'Real', 'double', 'Double'

  constructor: ->return super

  toValue: (aString)->
    if isFloat aString
      aString = parseFloat(aString)
    else unless isNumber aString
      aString = undefined
    aString
