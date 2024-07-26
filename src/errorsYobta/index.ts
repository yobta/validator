import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export interface YobtaErrorReporter {
  (errors: YobtaContext['errors'], context: YobtaContext): void
}

export const errorsYobta = <I>(
  report: YobtaErrorReporter,
): YobtaSyncRule<I, I> =>
  ruleYobta((input: I, context) => {
    const { errors } = context
    if (errors.length) {
      report(errors, context)
    }
    return input
  })
