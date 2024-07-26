import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const constantMessage = <I>(value: I): string =>
  `Should be identical to "${String(value)}"`

export function constant<I>(
  value: I,
  message?: string,
): YobtaSyncRule<unknown, I> {
  return ruleYobta(input => {
    if (input === value) {
      return input as I
    }
    throw new Error(message ?? constantMessage(value))
  })
}
