import type { SyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

export const dateMessage = 'It should be a date'

export const dateYobta = (
  message = dateMessage,
): SyncRule<any, Date | undefined> =>
  ruleYobta(input => {
    if (typeof input === 'undefined') return input

    const value = new Date(input)

    if (isNaN(value.getTime()) || input === null) throw new Error(message)

    return value
  })
