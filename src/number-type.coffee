isInt           = require 'util-ex/lib/is/string/int'
isFloat         = require 'util-ex/lib/is/string/float'
isNumber        = require 'util-ex/lib/is/type/number'
AbstractNumber  = require './'
register        = AbstractNumber.register
aliases         = AbstractNumber.aliases

module.exports = class NumberType
  register NumberType
  aliases NumberType, 'number'

  constructor: ->return super

  toValue: (aString)->
    if isInt aString
      aString = parseInt(aString)
    else if isFloat aString
      aString = parseFloat(aString)
    else unless isNumber aString
      aString = undefined
    aString
