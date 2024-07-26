import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface Effect<I> {
  (input: I, context: YobtaContext): void
}

export const effectYobta = <I>(effect: Effect<I>): YobtaSyncRule<I, I> =>
  ruleYobta((input: I, context: YobtaContext) => {
    effect(input, context)
    return input
  })
