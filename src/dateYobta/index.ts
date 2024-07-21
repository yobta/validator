import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const dateMessage = 'It should be a date'

export const dateYobta = (
  message = dateMessage,
): YobtaSyncRule<unknown, Date> =>
  ruleYobta(input => {
    const value = new Date(input as string)

    if (!Number(value)) {
      throw new Error(message)
    }

    return value
  })
