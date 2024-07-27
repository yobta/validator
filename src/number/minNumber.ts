import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const minNumberMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minNumber = (
  limit: () => number,
  message = minNumberMessage,
): YobtaSyncRule<number, number> =>
  rule<number, number>(input => {
    if (input < limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
