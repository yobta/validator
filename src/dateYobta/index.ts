import { ruleYobta, SyncRule } from '../ruleYobta'

export const dateMessage = 'It should be a date'

export const dateYobta = (
  message = dateMessage
): SyncRule<any, Date | undefined> =>
  ruleYobta(input => {
    if (typeof input === 'undefined') return input

    let value = new Date(input)

    if (isNaN(value.getTime()) || input === null) throw new Error(message)

    return value
  })
