import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface YobtaEffect<I> {
  (input: I, context: YobtaContext): void
}

export const effect = <I>(callback: YobtaEffect<I>): YobtaSyncRule<I, I> =>
  ruleYobta((input: I, context: YobtaContext) => {
    callback(input, context)
    return input
  })
