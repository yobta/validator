import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

export const integerMessage = 'It should be an integer'

interface IntegerFactory {
  (message?: string): SyncRule<number, number>
}

export const integerYobta: IntegerFactory = (message = integerMessage) =>
  ruleYobta(input => {
    if (Number.isInteger(input)) return input

    throw new Error(message)
  })
