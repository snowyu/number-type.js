isInt           = require 'util-ex/lib/is/string/int'
isFloat         = require 'util-ex/lib/is/string/float'
AbstractNumber  = require './'
register        = AbstractNumber.register
aliases         = AbstractNumber.aliases
isInteger       = Number.isInteger

module.exports = class IntType
  register IntType
  aliases IntType, 'int', 'Integer', 'integer'

  constructor: ->return super

  stringToValue: (aString)->
    if isInt aString
      aString = parseInt(aString)
    else
      aString = undefined
    aString
  _isValid: (value)-> isInteger value
