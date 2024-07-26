import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maxMessage = (limit: number): string =>
  `It should be within ${limit}`

export const max = (
  limit: () => number,
  message = maxMessage,
): YobtaSyncRule<number, number> =>
  ruleYobta<number, number>(input => {
    const l = limit()
    if (input > l) {
      throw new Error(message(l))
    }
    return input
  })
