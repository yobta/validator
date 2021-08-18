import { createRule, SyncRule } from '../createRule'

export const maximumYobtaMessage = (limit: number): string =>
  `Should be within ${limit}`

export const maximumYobta = (
  limit: number,
  message = maximumYobtaMessage
): SyncRule<number, number> =>
  createRule(input => {
    if (input > limit) throw new Error(message(limit))

    return input
  })
