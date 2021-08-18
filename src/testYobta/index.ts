import { createRule, SyncRule } from '../createRule'

export const testMessage = 'Invalid format'

export const testYobta = (
  expression: RegExp,
  message = testMessage
): SyncRule<string, string> =>
  createRule(input => {
    if (typeof input === 'undefined' || expression.test(input)) return input
    throw new Error(message)
  })
