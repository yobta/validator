import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const testMessage = 'Invalid format'

interface TestFactory {
  (expression: RegExp, message?: string): YobtaSyncRule<string, string>
}

export const testYobta: TestFactory = (
  expression: RegExp,
  message = testMessage,
) =>
  ruleYobta(input => {
    if (expression.test(input)) {
      return input
    }
    throw new Error(message)
  })
