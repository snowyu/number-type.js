import 'jest-extended'

import { numberTest } from './abstract-number-type.spec'
import { NumberType } from './number-type'
import { floatTests } from './float-type.spec'

numberTest(NumberType, floatTests)
