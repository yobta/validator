import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

interface YobtaSuccessCallback<I> {
  (input: I, context: YobtaContext): void
}

export const success = <I>(cb: YobtaSuccessCallback<I>): YobtaSyncRule<I, I> =>
  createRule((input: I, context) => {
    if (!context.errors.length) {
      cb(input, context)
    }
    return input
  })
