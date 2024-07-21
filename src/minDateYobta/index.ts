import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDateYobta = (
  limit: Date,
  message = minDateMessage,
): YobtaSyncRule<Date, Date> =>
  ruleYobta(input => {
    if (input.getTime() < limit.getTime()) {
      throw new Error(message(limit))
    }

    return input
  })
