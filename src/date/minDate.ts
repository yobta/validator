import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDate = (
  limit: () => Date,
  message = minDateMessage,
): YobtaSyncRule<Date, Date> =>
  ruleYobta((input: Date) => {
    const l = limit()
    if (input.getTime() < l.getTime()) {
      throw new Error(message(l))
    }

    return input
  })
