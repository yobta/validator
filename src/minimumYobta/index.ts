import { createRule, SyncRule } from '../createRule'

export const minimumYobtaMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minimumYobta = (
  limit: number,
  message = minimumYobtaMessage
): SyncRule<number, number> =>
  createRule(input => {
    if (input < limit) throw new Error(message(limit))

    return input
  })
