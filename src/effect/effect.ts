import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

interface YobtaEffect<I> {
  (input: I, context: YobtaContext): void
}

export const effect = <I>(callback: YobtaEffect<I>): YobtaSyncRule<I, I> =>
  createRule((input: I, context: YobtaContext) => {
    callback(input, context)
    return input
  })
