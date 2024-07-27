import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

interface Handler<I> {
  (input: I, context: YobtaContext): void
}

export const successYobta = <I>(handle: Handler<I>): YobtaSyncRule<I, I> =>
  createRule((input: I, context) => {
    if (!context.errors.length) {
      handle(input, context)
    }
    return input
  })
