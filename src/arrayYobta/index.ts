import { ruleYobta, SyncRule } from '../ruleYobta'

export const arrayMessage = 'It should be an array'

export const arrayYobta = (
  message: string = arrayMessage
): SyncRule<any, any[] | undefined> =>
  ruleYobta(input => {
    if (!Array.isArray(input) && typeof input !== 'undefined') {
      throw new Error(message)
    }

    return input
  })
