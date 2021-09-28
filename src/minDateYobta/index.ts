import { ruleYobta, SyncRule } from '../ruleYobta'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDateYobta = (
  limit: Date,
  message = minDateMessage
): SyncRule<Date, Date> =>
  ruleYobta(input => {
    if (input.getTime() < limit.getTime()) throw new Error(message(limit))

    return input
  })
