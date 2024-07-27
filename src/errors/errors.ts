import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export interface YobtaErrorsCallback {
  (errors: YobtaContext['errors'], context: YobtaContext): void
}

export const errors = <I>(cb: YobtaErrorsCallback): YobtaSyncRule<I, I> =>
  createRule((input: I, ctx) => {
    if (ctx.errors.length) {
      cb(ctx.errors, ctx)
    }
    return input
  })
