import { createRule, SyncRule } from '../createRule'

export const dateMessage = 'Should be a date'

export const dateYobta = <I>(
  message = dateMessage
): SyncRule<I, Date | undefined> =>
  createRule(input => {
    if (typeof input === 'undefined') return input

    let value = new Date(input as any)

    if (isNaN(value.getTime()) || input === null) throw new Error(message)

    return value
  })
