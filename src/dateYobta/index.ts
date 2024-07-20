import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const dateMessage = 'It should be a date'

export const dateYobta = (
  message = dateMessage,
): YobtaOptionalSyncRule<unknown, Date> =>
  ruleYobta(input => {
    if (input === undefined) {
      return input
    }

    const value = new Date(input as string)

    if (isNaN(value.getTime()) || input === null) {
      throw new Error(message)
    }

    return value
  })
