import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export interface YobtaErrorsCallback {
  (errors: YobtaContext['errors'], context: YobtaContext): void
}

export const errors = <I>(cb: YobtaErrorsCallback): YobtaSyncRule<I, I> =>
  ruleYobta((input: I, ctx) => {
    if (ctx.errors.length) {
      cb(ctx.errors, ctx)
    }
    return input
  })
