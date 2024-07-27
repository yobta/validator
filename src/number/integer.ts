import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const integerMessage = 'It should be an integer'

type Integer = { __brand: 'integer' } & number
interface IntegerFactory {
  (message?: string): YobtaSyncRule<number, Integer>
}

export const integer: IntegerFactory = (message = integerMessage) =>
  rule(input => {
    if (Number.isInteger(input)) {
      return input as Integer
    }

    throw new Error(message)
  })
