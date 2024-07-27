import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maxNumberMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maxNumber = (
  limit: () => number,
  message = maxNumberMessage,
): YobtaSyncRule<number, number> =>
  ruleYobta<number, number>(input => {
    if (input > limit()) {
      throw new Error(message(limit()))
    }
    return input
  })
