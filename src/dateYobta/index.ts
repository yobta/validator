import { createRule, SyncRule } from '../createRule'

export const dateMessage = 'Should be a date'

export const dateYobta = (
  message = dateMessage
): SyncRule<any, Date | undefined> =>
  createRule(input => {
    if (typeof input === 'undefined') return input

    let value = new Date(input)

    if (isNaN(value.getTime()) || input === null) throw new Error(message)

    return value
  })
