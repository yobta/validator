import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const testMessage = 'Invalid format'

interface TestFactory {
  (expression: RegExp, message?: string): YobtaSyncRule<string, string>
}

export const testYobta: TestFactory = (
  expression: RegExp,
  message = testMessage,
) =>
  createRule<string, string>(input => {
    if (expression.test(input)) {
      return input
    }
    throw new Error(message)
  })
