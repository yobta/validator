import { createRule, Rule } from '../createRule'

export const minimumYobtaMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minimumYobta = (
  limit: number,
  message = minimumYobtaMessage
): Rule<number, number> =>
  createRule(input => {
    if (input < limit) throw new Error(message(limit))

    return input
  })
