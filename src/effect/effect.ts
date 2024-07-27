import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

interface YobtaEffect<I> {
  (input: I, context: YobtaContext): void
}

export const effect = <I>(callback: YobtaEffect<I>): YobtaSyncRule<I, I> =>
  rule((input: I, context: YobtaContext) => {
    callback(input, context)
    return input
  })
