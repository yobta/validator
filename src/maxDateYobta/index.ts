import { getMessage } from '../_internal/getMessage/getMessage.js'
import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDateYobta = (
  limit: Date,
  message: typeof maxDateMessage | string = maxDateMessage,
): SyncRule<Date, Date> =>
  ruleYobta(input => {
    if (input.getTime() > limit.getTime()) {
      throw new Error(getMessage(message, limit))
    }

    return input
  })
