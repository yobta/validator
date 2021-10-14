import {
  SyncRules,
  SyncRulesChain7,
  SyncRulesChain6,
  SyncRulesChain5,
  SyncRulesChain4,
  SyncRulesChain3,
  SyncRulesChain2,
  SyncRulesChain1,
} from '../ruleYobta'
import { handleUnknownError } from '../_internal/parseUnknownError'
import { pipe, PipedFactories, PipeFactoryResult } from '../_internal/pipe'
import { createContext } from '../_internal/createContext'
import { Failure, Success, SyncYobtaRule } from '..'

//#region Types
export interface SyncYobtaFactory {
  <R extends SyncRules>(...rules: PipedFactories<R>): (
    input: any,
  ) => Success<R> | Failure
  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): SyncYobtaRule<any, R7>
  <R1, R2, R3, R4, R5, R6>(
    ...rules: SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): SyncYobtaRule<any, R6>
  <R1, R2, R3, R4, R5>(
    ...rules: SyncRulesChain5<R1, R2, R3, R4, R5>
  ): SyncYobtaRule<any, R5>
  <R1, R2, R3, R4>(...rules: SyncRulesChain4<R1, R2, R3, R4>): SyncYobtaRule<
    any,
    R4
  >
  <R1, R2, R3>(...rules: SyncRulesChain3<R1, R2, R3>): SyncYobtaRule<any, R3>
  <R1, R2>(...rules: SyncRulesChain2<R1, R2>): SyncYobtaRule<any, R2>
  <R1>(...rules: SyncRulesChain1<R1>): SyncYobtaRule<any, R1>
}
//#endregion

const field = '@'

export const syncYobta: SyncYobtaFactory =
  <R extends SyncRules>(...rules: R) =>
  (data: any) => {
    let context = createContext(data)

    let validators = rules.map(next => next(context)) as SyncRules

    try {
      let result: PipeFactoryResult<R> = pipe(...validators)(data)
      if (context.errors.length) {
        return [null, context.errors] as Failure
      }
      return [result, null] as Success<R>
    } catch (error) {
      let yobtaError = handleUnknownError({ error, field, path: [] })
      context.pushError(yobtaError)
      return [null, context.errors] as Failure
    }
  }
