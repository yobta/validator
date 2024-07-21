import { reEmailYobta } from '../_patterns/reEmailYobta.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const emailMessage = 'It should be an email'

export type YobtaEmail = { __email__: void } & string

interface EmailFactory {
  <I extends string>(message?: string): YobtaSyncRule<I, YobtaEmail>
}

export const emailYobta: EmailFactory = (message = emailMessage) =>
  ruleYobta(value => {
    const trimmed = value.trim()
    if (reEmailYobta.test(trimmed)) {
      return trimmed as YobtaEmail
    }
    throw new Error(message)
  })
