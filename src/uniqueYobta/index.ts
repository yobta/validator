import { createRule, SyncRule } from '../createRule'

export const uniqueMessage = 'Should contain unique items'

export function uniqueYobta(message = uniqueMessage): SyncRule<any[], any[]> {
  return createRule(input => {
    if (new Set(input).size === input.length) return input
    throw new Error(message)
  })
}
