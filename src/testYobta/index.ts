import { ruleYobta, SyncRule } from '../ruleYobta'

export const testMessage = 'Invalid format'

export const testYobta = (
  expression: RegExp,
  message = testMessage
): SyncRule<string, string> =>
  ruleYobta(input => {
    if (typeof input === 'undefined' || expression.test(input)) return input
    throw new Error(message)
  })
