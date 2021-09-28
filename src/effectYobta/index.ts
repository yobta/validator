import { ruleYobta, SyncRule } from '../ruleYobta'

export interface EffectYobta {
  <I extends any>(effect: () => void): SyncRule<I, I>
}

export const effectYobta: EffectYobta = effect =>
  ruleYobta(input => {
    effect()
    return input
  })
