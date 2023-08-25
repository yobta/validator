import { getMessage } from '../_internal/getMessage/getMessage.js'
import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

export const maximumYobtaMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maximumYobta = (
  limit: number,
  message: typeof maximumYobtaMessage | string = maximumYobtaMessage,
): SyncRule<number, number> =>
  ruleYobta(input => {
    if (input > limit) throw new Error(getMessage(message, limit))

    return input
  })
