import { createRule, Rule } from '../createRule'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDateYobta = (
  limit: Date,
  message = minDateMessage
): Rule<Date, Date> =>
  createRule(input => {
    if (input.getTime() < limit.getTime()) throw new Error(message(limit))

    return input
  })
