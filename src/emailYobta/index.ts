import { reEmailYobta } from '../regularExpressions/index.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

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
