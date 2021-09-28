import { ruleYobta, SyncRule } from '../ruleYobta'

export const integerMessage = 'It should be an integer'

export const integerYobta = (
  message = integerMessage
): SyncRule<number | undefined, number | undefined> =>
  ruleYobta(input => {
    if (Number.isInteger(input) || typeof input === 'undefined') return input

    throw new Error(message)
  })
