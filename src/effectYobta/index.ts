import { createRule, SyncRule } from '../createRule'

export interface EffectYobta {
  <I extends any>(effect: () => void): SyncRule<I, I>
}

export const effectYobta: EffectYobta = effect =>
  createRule(input => {
    effect()
    return input
  })
