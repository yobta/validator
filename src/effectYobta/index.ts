import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface Effect<I> {
  (input: I, context: YobtaContext): void
}
export interface EffectYobta {
  <I extends any>(effect: Effect<I>): YobtaSyncRule<I, I>
}

export const effectYobta: EffectYobta = effect =>
  ruleYobta((input, context) => {
    effect(input, context)
    return input
  })
