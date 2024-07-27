import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const uniqueMessage = 'It should contain unique items'

export function uniqueYobta(
  message = uniqueMessage,
): YobtaSyncRule<unknown[], unknown[]> {
  return createRule((input: unknown[]) => {
    if (new Set(input).size === input.length) {
      return input
    }
    throw new Error(message)
  })
}
