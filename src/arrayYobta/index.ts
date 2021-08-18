import { createRule, SyncRule } from '../createRule'

export const arrayMessage = 'Should be an array'

export const arrayYobta = <I>(
  message: string = arrayMessage
): SyncRule<I, any[] | undefined> =>
  createRule(input => {
    if (!Array.isArray(input) && typeof input !== 'undefined') {
      throw new Error(message)
    }

    return input
  })
