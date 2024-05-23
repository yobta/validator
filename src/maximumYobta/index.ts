import type { SyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

export const maximumYobtaMessage = (limit: number): string =>
  `It should be within ${limit}`

export const maximumYobta = (
  limit: number,
  message = maximumYobtaMessage,
): SyncRule<number | undefined, number | undefined> =>
  ruleYobta(input => {
    if (input === undefined) return input
    if (input > limit) throw new Error(message(limit))

    return input
  })
