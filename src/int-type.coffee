isInt           = require 'util-ex/lib/is/string/int'
isFloat         = require 'util-ex/lib/is/string/float'
isInteger       = require 'util-ex/lib/is/type/integer'
AbstractNumber  = require './'
register        = AbstractNumber.register
aliases         = AbstractNumber.aliases

module.exports = class IntType
  register IntType
  aliases IntType, 'int', 'Integer', 'integer'

  constructor: ->return super

  toValue: (aString)->
    if isInt aString
      aString = parseInt(aString)
    else unless isInteger aString
      aString = undefined
    aString
  _isValid: (value)-> isInteger value
