import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export interface YobtaErrorsCallback {
  (errors: YobtaContext['errors'], context: YobtaContext): void
}

export const errors = <I>(cb: YobtaErrorsCallback): YobtaSyncRule<I, I> =>
  rule((input: I, ctx) => {
    if (ctx.errors.length) {
      cb(ctx.errors, ctx)
    }
    return input
  })
