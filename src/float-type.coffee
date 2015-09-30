isInt           = require 'util-ex/lib/is/string/int'
isFloat         = require 'util-ex/lib/is/string/float'
AbstractNumber  = require './'
register        = AbstractNumber.register
aliases         = AbstractNumber.aliases

module.exports = class FloatType
  register FloatType
  aliases 'float', 'real', 'Real', 'double', 'Double'

  constructor: ->return super

  stringToValue: (aString)->
    if isFloat aString
      aString = parseFloat(aString)
    else
      aString = undefined
    aString
