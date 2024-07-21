import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const integerMessage = 'It should be an integer'

type Integer = { __brand: 'integer' } & number
interface IntegerFactory {
  (message?: string): YobtaSyncRule<number, Integer>
}

export const integerYobta: IntegerFactory = (message = integerMessage) =>
  ruleYobta(input => {
    if (Number.isInteger(input)) {
      return input as Integer
    }

    throw new Error(message)
  })
