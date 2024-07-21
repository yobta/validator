import { reEmailYobta } from '../_patterns/reEmailYobta.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const emailMessage = 'It should be an email'

interface EmailFactory {
  (message?: string): YobtaSyncRule<string, string>
}

export const emailYobta: EmailFactory = (message = emailMessage) =>
  ruleYobta(value => {
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (reEmailYobta.test(trimmed)) {
        return trimmed
      }
    }
    throw new Error(message)
  })
