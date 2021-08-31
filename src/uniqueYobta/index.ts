import { createRule, Rule } from '../createRule'

export const uniqueMessage = 'It should contain unique items'

export function uniqueYobta(message = uniqueMessage): Rule<any[], any[]> {
  return createRule(input => {
    if (new Set(input).size === input.length) return input
    throw new Error(message)
  })
}
