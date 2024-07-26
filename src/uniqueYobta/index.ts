import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const uniqueMessage = 'It should contain unique items'

export function uniqueYobta(
  message = uniqueMessage,
): YobtaSyncRule<unknown[], unknown[]> {
  return ruleYobta((input: unknown[]) => {
    if (new Set(input).size === input.length) {
      return input
    }
    throw new Error(message)
  })
}
