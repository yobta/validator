import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDateYobta = (
  limit: Date,
  message = maxDateMessage,
): YobtaSyncRule<Date, Date> =>
  ruleYobta((input: Date) => {
    if (input.getTime() > limit.getTime()) {
      throw new Error(message(limit))
    }

    return input
  })
