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
import { parseUnknownError } from '../_internal/parseUnknownError'
import {
  Functions,
  pipe,
  PipedFactories,
  PipeFactoryResult
} from '../_internal/pipe'
import { YobtaError } from '../YobtaError'

export interface ItemsYobta {
  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): SyncRule<any[], R7[]>
  <R1, R2, R3, R4, R5, R6>(
    ...rules: SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): SyncRule<any[], R6[]>
  <R1, R2, R3, R4, R5>(...rules: SyncRulesChain5<R1, R2, R3, R4, R5>): SyncRule<
    any,
    R5[]
  >
  <R1, R2, R3, R4>(...rules: SyncRulesChain4<R1, R2, R3, R4>): SyncRule<
    any[],
    R4[]
  >
  <R1, R2, R3>(...rules: SyncRulesChain3<R1, R2, R3>): SyncRule<any[], R3[]>
  <R1, R2>(...rules: SyncRulesChain2<R1, R2>): SyncRule<any[], R2[]>
  <R1>(...rules: SyncRulesChain1<R1>): SyncRule<any[], R1[]>
  <F extends SyncRules>(...rules: PipedFactories<F>): SyncRule<
    any[],
    PipeFactoryResult<F>[]
  >
}

export const itemsYobta: ItemsYobta = <R extends SyncRules>(
  ...rules: R
): SyncRule<any[], PipeFactoryResult<R>[]> => {
  return ruleYobta((input: any[], context) => {
    let next = rules.map(rule => rule(context)) as Functions

    return input.map((item, index) => {
      try {
        return pipe(...next)(item)
      } catch (error) {
        let { message } = parseUnknownError(error)
        context.pushError(
          new YobtaError({
            message,
            field: context.field,
            path: [...context.path, index]
          })
        )
        return item
      }
    })
  })
}
