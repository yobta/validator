import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const minimumYobtaMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minimumYobta = (
  limit: number,
  message = minimumYobtaMessage,
): YobtaSyncRule<number, number> =>
  ruleYobta<number, number>(input => {
    if (input < limit) {
      throw new Error(message(limit))
    }

    return input
  })
