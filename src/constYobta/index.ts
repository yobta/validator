import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const constMessage = <I>(value: I): string =>
  `Should be identical to "${String(value)}"`

export function constYobta<I>(
  value: I,
  message?: string,
): YobtaOptionalSyncRule<any, I> {
  return ruleYobta(input => {
    if (input === value) return input
    throw new Error(message ?? constMessage(value))
  })
}
