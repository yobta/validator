import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { YobtaContext } from '../_internal/createContext/index.js'

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
