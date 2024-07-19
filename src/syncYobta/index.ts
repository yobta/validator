import { createContext } from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type {
  FailureYobta,
  SuccessYobta,
  SyncValidatorYobta,
} from '../index.js'
import type {
  SyncRules,
  SyncRulesChain1,
  SyncRulesChain2,
  SyncRulesChain3,
  SyncRulesChain4,
  SyncRulesChain5,
  SyncRulesChain6,
  SyncRulesChain7,
} from '../ruleYobta/index.js'

//#region Types
export interface SyncYobtaFactory {
  <R extends SyncRules>(
    ...rules: SyncRulesPipeYobta<R>
  ): (input: any) => FailureYobta | SuccessYobta<R>
  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): SyncValidatorYobta<any, R7>
  <R1, R2, R3, R4, R5, R6>(
    ...rules: SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): SyncValidatorYobta<any, R6>
  <R1, R2, R3, R4, R5>(
    ...rules: SyncRulesChain5<R1, R2, R3, R4, R5>
  ): SyncValidatorYobta<any, R5>
  <R1, R2, R3, R4>(
    ...rules: SyncRulesChain4<R1, R2, R3, R4>
  ): SyncValidatorYobta<any, R4>
  <R1, R2, R3>(
    ...rules: SyncRulesChain3<R1, R2, R3>
  ): SyncValidatorYobta<any, R3>
  <R1, R2>(...rules: SyncRulesChain2<R1, R2>): SyncValidatorYobta<any, R2>
  <R1>(...rules: SyncRulesChain1<R1>): SyncValidatorYobta<any, R1>
}
//#endregion

const field = '@'

export const syncYobta: SyncYobtaFactory =
  <R extends SyncRules>(...rules: R) =>
  (data: any) => {
    const context = createContext(data)

    const validators = rules.map(next => next(context)) as Functions

    try {
      const result: PipeFactoryResult<R> = pipe(...validators)(data)
      if (context.errors.length) {
        return [null, context.errors] as FailureYobta
      }
      return [result, null] as SuccessYobta<R>
    } catch (error) {
      const yobtaError = handleUnknownError({ error, field, path: [] })
      context.pushError(yobtaError)
      return [null, context.errors] as FailureYobta
    }
  }
