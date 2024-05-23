import type { SyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

export const testMessage = 'Invalid format'

interface TestFactory {
  (expression: RegExp, message?: string): SyncRule<string, string>
}

export const testYobta: TestFactory = (
  expression: RegExp,
  message = testMessage,
) =>
  ruleYobta(input => {
    if (input === '' || expression.test(input)) return input
    throw new Error(message)
  })
