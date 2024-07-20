import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const integerMessage = 'It should be an integer'

type Integer = { __brand: 'integer' } & number
interface IntegerFactory {
  (message?: string): YobtaOptionalSyncRule<unknown, Integer>
}

export const integerYobta: IntegerFactory = (message = integerMessage) =>
  ruleYobta(input => {
    if (input === undefined || Number.isInteger(input)) {
      return input as Integer
    }

    throw new Error(message)
  })
