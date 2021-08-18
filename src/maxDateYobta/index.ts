import { createRule, SyncRule } from '../createRule'

export const maxDateMessage = (limit: Date): string =>
  `Should be within ${limit.toUTCString()}`

export const maxDateYobta = (
  limit: Date,
  message = maxDateMessage
): SyncRule<Date, Date> =>
  createRule(input => {
    if (input.getTime() > limit.getTime()) throw new Error(message(limit))

    return input
  })
