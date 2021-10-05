import { reEmailYobta } from '../regularExpressions'
import { ruleYobta, SyncRule } from '../ruleYobta'

export const emailMessage = 'It should be an email'

export const emailYobta = (
  message = emailMessage,
): SyncRule<string | undefined, string | undefined> =>
  ruleYobta(input => {
    if (typeof input === 'undefined') return input

    let value = input.trim()

    if (reEmailYobta.test(value)) return value

    throw new Error(message)
  })
