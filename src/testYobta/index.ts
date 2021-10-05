import { ruleYobta, SyncRule } from '../ruleYobta'

export const testMessage = 'Invalid format'

interface TestFactory {
  <I extends string | undefined>(
    expression: RegExp,
    message?: string,
  ): SyncRule<I, I>
}

export const testYobta: TestFactory = (
  expression: RegExp,
  message = testMessage,
) =>
  ruleYobta(input => {
    if (typeof input === 'undefined' || expression.test(input)) return input
    throw new Error(message)
  })
