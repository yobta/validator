import { createRule, SyncRule } from '../createRule'

export const integerMessage = 'It should be an integer'

export const integerYobta = (
  message = integerMessage
): SyncRule<number | undefined, number | undefined> =>
  createRule(input => {
    if (Number.isInteger(input) || typeof input === 'undefined') return input

    throw new Error(message)
  })
