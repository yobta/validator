import { ruleYobta, SyncRule } from '../ruleYobta'

export const minimumYobtaMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minimumYobta = (
  limit: number,
  message = minimumYobtaMessage
): SyncRule<number, number> =>
  ruleYobta(input => {
    if (input < limit) throw new Error(message(limit))

    return input
  })
