isInt           = require 'util-ex/lib/is/string/int'
isFloat         = require 'util-ex/lib/is/string/float'
AbstractNumber  = require './'
register        = AbstractNumber.register
aliases         = AbstractNumber.aliases

module.exports = class NumberType
  register NumberType
  aliases NumberType, 'number'

  constructor: ->return super

  stringToValue: (aString)->
    if isInt aString
      aString = parseInt(aString)
    else if isFloat aString
      aString = parseFloat(aString)
    else
      aString = undefined
    aString
