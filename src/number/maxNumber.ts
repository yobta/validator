import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxNumberMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maxNumber = (
  limit: () => number,
  message = maxNumberMessage,
): YobtaSyncRule<number, number> =>
  rule<number, number>(input => {
    if (input > limit()) {
      throw new Error(message(limit()))
    }
    return input
  })
