import { ruleYobta, SyncRule } from '../ruleYobta'
import { YobtaContext } from '../_internal/createContext'

export interface YobtaErrorReporter {
  (errors: YobtaContext['errors'], context: YobtaContext): void
}

interface ErrorsYobtaFactory {
  <I>(report: YobtaErrorReporter): SyncRule<I, I>
}

export const errorsYobta: ErrorsYobtaFactory = report =>
  ruleYobta((input, context) => {
    let { errors } = context
    if (errors.length) {
      report(errors, context)
    }
    return input
  })
