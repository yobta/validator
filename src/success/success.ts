import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

interface YobtaSuccessCallback<I> {
  (input: I, context: YobtaContext): void
}

export const success = <I>(cb: YobtaSuccessCallback<I>): YobtaSyncRule<I, I> =>
  rule((input: I, context) => {
    if (!context.errors.length) {
      cb(input, context)
    }
    return input
  })
