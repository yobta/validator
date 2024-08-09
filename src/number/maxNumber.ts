import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxNumberMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maxNumber = <I extends number | undefined>(
  limit: () => number,
  message = maxNumberMessage,
): YobtaSyncRule<I, YobtaMaybe<I, number>> =>
  rule((input: I) => {
    if (typeof input === 'number' && input > limit()) {
      throw new Error(message(limit()))
    }
    return input as unknown as YobtaMaybe<I, number>
  })
