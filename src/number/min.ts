import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const minMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const min = (
  limit: () => number,
  message = minMessage,
): YobtaSyncRule<number, number> =>
  ruleYobta<number, number>(input => {
    if (input < limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
