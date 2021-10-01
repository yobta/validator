import { ruleYobta, SyncRule } from '../ruleYobta'
import { YobtaContext } from '../_internal/YobtaContext'

interface Effect<I> {
  (input: I, context: YobtaContext): void
}
export interface EffectYobta {
  <I extends any>(effect: Effect<I>): SyncRule<I, I>
}

export const effectYobta: EffectYobta = effect =>
  ruleYobta((input, context) => {
    effect(input, context)
    return input
  })
