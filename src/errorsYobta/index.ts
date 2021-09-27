import { createRule, SyncRule } from '../createRule'
import { YobtaContext } from '../YobtaContext'

interface Reporter {
  (errors: YobtaContext['errors'], context: YobtaContext): void
}

interface ErrorsYobtaFactory {
  <I>(report: Reporter): SyncRule<I, I>
}

export const errorsYobta: ErrorsYobtaFactory = report =>
  createRule((input, context) => {
    let { errors } = context
    if (errors.length) {
      report(errors, context)
    }
    return input
  })
