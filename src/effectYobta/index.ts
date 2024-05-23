import type { YobtaContext } from '../_internal/createContext/index.js'
import type { SyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

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
