import {
  SyncOrAsyncRules,
  AsyncRulesChain1,
  AsyncRulesChain2,
  AsyncRulesChain3,
  AsyncRulesChain4,
  AsyncRulesChain5,
  AsyncRulesChain6,
  AsyncRulesChain7,
} from '../ruleYobta'
import { handleUnknownError } from '../_internal/parseUnknownError'
import { PipedFactories, PipeFactoryResult } from '../_internal/pipe'
import { asyncPipe } from '../_internal/asyncPipe'
import { createContext } from '../_internal/createContext'
import { YobtaError } from '../YobtaError'

//#region Types
export type AsyncYobtaRule<I, O> = (input: I) => Promise<O>
export interface AsyncYobtaFactory {
  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: AsyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): AsyncYobtaRule<any, R7>
  <R1, R2, R3, R4, R5, R6>(
    ...rules: AsyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): AsyncYobtaRule<any, R6>
  <R1, R2, R3, R4, R5>(
    ...rules: AsyncRulesChain5<R1, R2, R3, R4, R5>
  ): AsyncYobtaRule<any, R5>
  <R1, R2, R3, R4>(...rules: AsyncRulesChain4<R1, R2, R3, R4>): AsyncYobtaRule<
    any,
    R4
  >
  <R1, R2, R3>(...rules: AsyncRulesChain3<R1, R2, R3>): AsyncYobtaRule<any, R3>
  <R1, R2>(...rules: AsyncRulesChain2<R1, R2>): AsyncYobtaRule<any, R2>
  <R1>(...rules: AsyncRulesChain1<R1>): AsyncYobtaRule<any, R1>
  <R extends SyncOrAsyncRules>(...rules: PipedFactories<R>): (
    input: any,
  ) => Promise<Success<R> | Failure>
}
type Success<R extends SyncOrAsyncRules> = [PipeFactoryResult<R>, null]
type Failure = [null, YobtaError[]]
//#endregion

const field = '@'

export const asyncYobta: AsyncYobtaFactory =
  <R extends SyncOrAsyncRules>(...rules: R) =>
  async (data: any) => {
    let context = createContext(data)

    let validators = rules.map(next => next(context)) as SyncOrAsyncRules

    try {
      let result: PipeFactoryResult<R> = await asyncPipe(...validators)(data)
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
