import { ruleYobta, SyncRule } from '../ruleYobta'
import { YobtaContext } from '../_internal/YobtaContext'

interface Reporter {
  (errors: YobtaContext['errors'], context: YobtaContext): void
}

interface ErrorsYobtaFactory {
  <I>(report: Reporter): SyncRule<I, I>
}

export const errorsYobta: ErrorsYobtaFactory = report =>
  ruleYobta((input, context) => {
    let { errors } = context
    if (errors.length) {
      report(errors, context)
    }
    return input
  })
