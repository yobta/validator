import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const minNumberMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minNumber = (
  limit: () => number,
  message = minNumberMessage,
): YobtaSyncRule<number, number> =>
  createRule<number, number>(input => {
    if (input < limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
