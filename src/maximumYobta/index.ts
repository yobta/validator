import { ruleYobta, SyncRule } from '../ruleYobta'

export const maximumYobtaMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maximumYobta = (
  limit: number,
  message = maximumYobtaMessage
): SyncRule<number, number> =>
  ruleYobta(input => {
    if (input > limit) throw new Error(message(limit))

    return input
  })
