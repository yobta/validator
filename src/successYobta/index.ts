import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface Handler<I> {
  (input: I, context: YobtaContext): void
}

export const successYobta = <I>(handle: Handler<I>): YobtaSyncRule<I, I> =>
  ruleYobta((input: I, context) => {
    if (!context.errors.length) {
      handle(input, context)
    }
    return input
  })
