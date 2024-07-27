import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const maxNumberMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maxNumber = (
  limit: () => number,
  message = maxNumberMessage,
): YobtaSyncRule<number, number> =>
  createRule<number, number>(input => {
    if (input > limit()) {
      throw new Error(message(limit()))
    }
    return input
  })
