import { getMessage } from '../_internal/getMessage/getMessage.js'
import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDateYobta = (
  limit: Date,
  message: typeof minDateMessage | string = minDateMessage,
): SyncRule<Date, Date> =>
  ruleYobta(input => {
    if (input.getTime() < limit.getTime()) {
      throw new Error(getMessage(message, limit))
    }

    return input
  })
