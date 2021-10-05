import { reEmailYobta } from '../regularExpressions'
import { ruleYobta, SyncRule } from '../ruleYobta'

export const emailMessage = 'It should be an email'

interface EmailFactory {
  (message?: string): SyncRule<string, string>
}

export const emailYobta: EmailFactory = (message = emailMessage) =>
  ruleYobta(value => {
    if (typeof value === 'string') {
      let trimmed = value.trim()
      if (reEmailYobta.test(trimmed)) {
        return trimmed
      }
    }
    throw new Error(message)
  })
