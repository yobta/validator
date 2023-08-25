import { getMessage } from '../_internal/getMessage/getMessage.js'
import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

export const minimumYobtaMessage = (limit: number): string =>
  `It should be at least ${limit}`

export const minimumYobta = (
  limit: number,
  message: typeof minimumYobtaMessage | string = minimumYobtaMessage,
): SyncRule<number, number> =>
  ruleYobta(input => {
    if (input < limit) throw new Error(getMessage(message, limit))

    return input
  })
