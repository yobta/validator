import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDate = (
  limit: () => Date,
  message = maxDateMessage,
): YobtaSyncRule<Date, Date> =>
  ruleYobta((input: Date) => {
    const l = limit()
    if (input.getTime() > l.getTime()) {
      throw new Error(message(l))
    }

    return input
  })
