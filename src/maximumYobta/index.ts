import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maximumYobtaMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maximumYobta = (
  limit: number,
  message = maximumYobtaMessage,
): YobtaSyncRule<number, number> =>
  ruleYobta<number, number>(input => {
    if (input > limit) {
      throw new Error(message(limit))
    }
    return input
  })
