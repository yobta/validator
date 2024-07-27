import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const uniqueMessage = 'It should contain unique items'

export function uniqueYobta(
  message = uniqueMessage,
): YobtaSyncRule<unknown[], unknown[]> {
  return rule((input: unknown[]) => {
    if (new Set(input).size === input.length) {
      return input
    }
    throw new Error(message)
  })
}
