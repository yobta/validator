import { ruleYobta, SyncRule } from '../ruleYobta'

export const uniqueMessage = 'It should contain unique items'

export function uniqueYobta(message = uniqueMessage): SyncRule<any[], any[]> {
  return ruleYobta(input => {
    if (new Set(input).size === input.length) return input
    throw new Error(message)
  })
}
