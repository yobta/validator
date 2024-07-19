import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipeFactoryResult,
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

export interface ItemsYobta {
  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): SyncRule<any[], R7[]>
  <R1, R2, R3, R4, R5, R6>(
    ...rules: SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): SyncRule<any[], R6[]>
  <R1, R2, R3, R4, R5>(
    ...rules: SyncRulesChain5<R1, R2, R3, R4, R5>
  ): SyncRule<any, R5[]>
  <R1, R2, R3, R4>(
    ...rules: SyncRulesChain4<R1, R2, R3, R4>
  ): SyncRule<any[], R4[]>
  <R1, R2, R3>(...rules: SyncRulesChain3<R1, R2, R3>): SyncRule<any[], R3[]>
  <R1, R2>(...rules: SyncRulesChain2<R1, R2>): SyncRule<any[], R2[]>
  <R1>(...rules: SyncRulesChain1<R1>): SyncRule<any[], R1[]>
  <F extends SyncRules>(
    ...rules: SyncRulesPipeYobta<F>
  ): SyncRule<any[], PipeFactoryResult<F>[]>
}

export const itemsYobta: ItemsYobta = <R extends SyncRules>(
  ...rules: R
): SyncRule<any[], PipeFactoryResult<R>[]> => {
  return ruleYobta((input: any[], context) => {
    const next = rules.map(rule => rule(context)) as Functions

    return input.map((item, index) => {
      try {
        return pipe(...next)(item)
      } catch (error) {
        throw handleUnknownError({
          error,
          field: context.field,
          path: [...context.path, index],
        })
      }
    })
  })
}
