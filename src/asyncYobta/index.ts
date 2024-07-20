import { asyncPipe } from '../_internal/asyncPipe/index.js'
import { createContext } from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type {
  AsyncRulesChain1,
  AsyncRulesChain2,
  AsyncRulesChain3,
  AsyncRulesChain4,
  AsyncRulesChain5,
  AsyncRulesChain6,
  AsyncRulesChain7,
  AsyncRulesChain8,
  AsyncRulesChain9,
  SyncOrAsyncRules,
} from '../ruleYobta/index.js'
import type { YobtaError } from '../YobtaError/index.js'

//#region Types
export type AsyncRuleYobta<I, O> = (
  input: I,
) => AsyncResultYobta<YobtaPretty<O>>

export interface AsyncYobtaFactory {
  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: AsyncRulesChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): AsyncRuleYobta<unknown, R9>
  <R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: AsyncRulesChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): AsyncRuleYobta<unknown, R8>
  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: AsyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): AsyncRuleYobta<unknown, R7>
  <R1, R2, R3, R4, R5, R6>(
    ...rules: AsyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): AsyncRuleYobta<unknown, R6>
  <R1, R2, R3, R4, R5>(
    ...rules: AsyncRulesChain5<R1, R2, R3, R4, R5>
  ): AsyncRuleYobta<unknown, R5>
  <R1, R2, R3, R4>(
    ...rules: AsyncRulesChain4<R1, R2, R3, R4>
  ): AsyncRuleYobta<unknown, R4>
  <R1, R2, R3>(
    ...rules: AsyncRulesChain3<R1, R2, R3>
  ): AsyncRuleYobta<unknown, R3>
  <R1, R2>(...rules: AsyncRulesChain2<R1, R2>): AsyncRuleYobta<unknown, R2>
  <R1>(...rules: AsyncRulesChain1<R1>): AsyncRuleYobta<unknown, R1>
  <R extends SyncOrAsyncRules>(
    ...rules: SyncRulesPipeYobta<R>
  ): (input: unknown) => AsyncResultYobta<PipeFactoryResult<R>>
}
export type SuccessYobta<R> = [R, null]
export type FailureYobta = [null, YobtaError[]]

export type AsyncResultYobta<R = unknown> = Promise<
  FailureYobta | SuccessYobta<R>
>
//#endregion

const field = '@'

export const asyncYobta: AsyncYobtaFactory =
  <R extends SyncOrAsyncRules>(...rules: R) =>
  async (data: any) => {
    const context = createContext(data)

    const validators = rules.map(next => next(context)) as Functions

    try {
      const result: PipeFactoryResult<R> = await asyncPipe(...validators)(data)
      if (context.errors.length) {
        return [null, context.errors] as FailureYobta
      }
      return [result, null] as SuccessYobta<PipeFactoryResult<R>>
    } catch (error) {
      const yobtaError = handleUnknownError({ error, field, path: [] })
      context.pushError(yobtaError)
      return [null, context.errors] as FailureYobta
    }
  }
