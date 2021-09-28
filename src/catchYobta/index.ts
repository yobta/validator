import {
  ruleYobta,
  SyncRule,
  SyncRules,
  SyncRulesChain1,
  SyncRulesChain2,
  SyncRulesChain3,
  SyncRulesChain4,
  SyncRulesChain5,
  SyncRulesChain6,
  SyncRulesChain7
} from '../ruleYobta'
import { Functions, pipe, PipedFactories } from '../_internal/pipe'

// export type SyncRule<I, O> = (input: I) => O
export interface CatchYobta {
  <R1, R2, R3, R4, R5, R6, R7>(
    fallbackValue: R7,
    ...rules: SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): SyncRule<any, R7>
  <R1, R2, R3, R4, R5, R6>(
    fallbackValue: R6,
    ...rules: SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): SyncRule<any, R6>
  <R1, R2, R3, R4, R5>(
    fallbackValue: R5,
    ...rules: SyncRulesChain5<R1, R2, R3, R4, R5>
  ): SyncRule<any, R5>
  <R1, R2, R3, R4>(
    fallbackValue: R4,
    ...rules: SyncRulesChain4<R1, R2, R3, R4>
  ): SyncRule<any, R4>
  <R1, R2, R3>(
    fallbackValue: R3,
    ...rules: SyncRulesChain3<R1, R2, R3>
  ): SyncRule<any, R3>
  <R1, R2>(fallbackValue: R2, ...rules: SyncRulesChain2<R1, R2>): SyncRule<
    any,
    R2
  >
  <R1>(fallbackValue: R1, ...rules: SyncRulesChain1<R1>): SyncRule<any, R1>
  <F extends SyncRules, R>(
    fallbackValue: R,
    ...rules: PipedFactories<F>
  ): SyncRule<any, R>
}

export const catchYobta: CatchYobta = (
  fallbackValue: any,
  ...rules: SyncRule<any, any>[]
) => {
  return ruleYobta((input, context) => {
    let next = rules.map(rule => rule(context)) as Functions
    try {
      return pipe(...next)(input)
      // eslint-disable-next-line unicorn/prefer-optional-catch-binding
    } catch (error) {
      return fallbackValue
    }
  })
}
