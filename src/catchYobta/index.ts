import type {
  Functions,
  PipedFunctions,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type {
  SyncRule,
  SyncRules,
  SyncRulesChain1,
  SyncRulesChain2,
  SyncRulesChain3,
  SyncRulesChain4,
  SyncRulesChain5,
  SyncRulesChain6,
  SyncRulesChain7,
} from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

// export type SyncRule<I, O> = (input: I) => O
export interface CatchYobta {
  <R1, R2, R3, R4, R5, R6, R7>(
    fallbackValue: R7,
    ...rules: SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): SyncRule<unknown, R7>
  <R1, R2, R3, R4, R5, R6>(
    fallbackValue: R6,
    ...rules: SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): SyncRule<unknown, R6>
  <R1, R2, R3, R4, R5>(
    fallbackValue: R5,
    ...rules: SyncRulesChain5<R1, R2, R3, R4, R5>
  ): SyncRule<unknown, R5>
  <R1, R2, R3, R4>(
    fallbackValue: R4,
    ...rules: SyncRulesChain4<R1, R2, R3, R4>
  ): SyncRule<unknown, R4>
  <R1, R2, R3>(
    fallbackValue: R3,
    ...rules: SyncRulesChain3<R1, R2, R3>
  ): SyncRule<unknown, R3>
  <R1, R2>(
    fallbackValue: R2,
    ...rules: SyncRulesChain2<R1, R2>
  ): SyncRule<unknown, R2>
  <R1>(fallbackValue: R1, ...rules: SyncRulesChain1<R1>): SyncRule<unknown, R1>
  <F extends SyncRules, R>(
    fallbackValue: R,
    ...rules: SyncRulesPipeYobta<F>
  ): SyncRule<unknown, R>
}

export const catchYobta: CatchYobta = (
  fallbackValue: any,
  ...rules: SyncRule<any, any>[]
) => {
  return ruleYobta((input, context) => {
    const next = rules.map(rule => rule(context)) as PipedFunctions<Functions>
    try {
      return pipe(...next)(input)
    } catch (error) {
      return fallbackValue
    }
  })
}
