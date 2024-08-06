import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const minNumberMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minNumber = <I extends number | undefined>(
  limit: () => number,
  message = minNumberMessage,
): YobtaSyncRule<I, YobtaMaybe<I, number>> =>
  rule((input: I) => {
    if (typeof input === 'number' && input < limit()) {
      throw new Error(message(limit()))
    }
    return input
  }) as YobtaSyncRule<I, YobtaMaybe<I, number>>
