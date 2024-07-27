import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const constantMessage = <I>(value: I): string =>
  `Should be identical to "${String(value)}"`

export function constant<I>(
  value: I,
  message?: string,
): YobtaSyncRule<unknown, I> {
  return createRule(input => {
    if (input === value) {
      return input as I
    }
    throw new Error(message ?? constantMessage(value))
  })
}
