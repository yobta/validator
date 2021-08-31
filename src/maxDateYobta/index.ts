import { createRule, Rule } from '../createRule'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDateYobta = (
  limit: Date,
  message = maxDateMessage
): Rule<Date, Date> =>
  createRule(input => {
    if (input.getTime() > limit.getTime()) throw new Error(message(limit))

    return input
  })
