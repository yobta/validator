import { ruleYobta, SyncRule } from '../ruleYobta'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDateYobta = (
  limit: Date,
  message = maxDateMessage
): SyncRule<Date, Date> =>
  ruleYobta(input => {
    if (input.getTime() > limit.getTime()) throw new Error(message(limit))

    return input
  })
