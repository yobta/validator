import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const integerMessage = 'It should be an integer'

type Integer = { __brand: 'integer' } & number
interface IntegerFactory {
  (message?: string): YobtaSyncRule<number, Integer>
}

export const integer: IntegerFactory = (message = integerMessage) =>
  createRule(input => {
    if (Number.isInteger(input)) {
      return input as Integer
    }

    throw new Error(message)
  })
