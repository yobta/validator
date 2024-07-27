import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const constantMessage = <I>(value: I): string =>
  `Should be identical to "${String(value)}"`

export function constant<I>(
  value: I,
  message?: string,
): YobtaSyncRule<unknown, I> {
  return rule(input => {
    if (input === value) {
      return input as I
    }
    throw new Error(message ?? constantMessage(value))
  })
}
