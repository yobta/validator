import type { YobtaContext } from '../_types/YobtaContext'
import type { YobtaOptionalIfUnkown } from '../_types/YobtaOptionalIfUnkown'

// #region SyncRules
type SyncValidator<I, O> = (input: I, context: YobtaContext) => O

export type YobtaSyncRule<I, O> = (context: YobtaContext) => (input: I) => O

export type YobtaSyncRules = [YobtaAnySyncRule, ...YobtaAnySyncRule[]]
export type YobtaAnySyncRule = YobtaSyncRule<any, any>

// #endregion

// #region AsyncRules
type AsyncValidator<I, O> = (input: I, context: YobtaContext) => Promise<O>

export type AsyncRule<I, O> = (
  context: YobtaContext,
) => (input: I) => Promise<YobtaOptionalIfUnkown<I, O>>

export type AnyAsyncRule = AsyncRule<any, any>
export type AnySyncOrAsyncRule = AnyAsyncRule | YobtaAnySyncRule
export type SyncOrAsyncRules = [AnySyncOrAsyncRule, ...AnySyncOrAsyncRule[]]
export type SyncOrAsyncRule<I, O> = YobtaSyncRule<UnwrapPromiseYobta<I>, O>

type UnwrapPromiseYobta<T> = T extends Promise<infer U> ? U : T

export type AsyncRulesChain1<R1> = [SyncOrAsyncRule<any, R1>]
export type AsyncRulesChain2<R1, R2> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<UnwrapPromiseYobta<R1>, R2>,
]
export type AsyncRulesChain3<R1, R2, R3> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
]
export type AsyncRulesChain4<R1, R2, R3, R4> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
]
export type AsyncRulesChain5<R1, R2, R3, R4, R5> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
]
export type AsyncRulesChain6<R1, R2, R3, R4, R5, R6> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
]
export type AsyncRulesChain7<R1, R2, R3, R4, R5, R6, R7> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
]
export type AsyncRulesChain8<R1, R2, R3, R4, R5, R6, R7, R8> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
  SyncOrAsyncRule<R7, R8>,
]
export type AsyncRulesChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9> = [
  SyncOrAsyncRule<any, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
  SyncOrAsyncRule<R7, R8>,
  SyncOrAsyncRule<R8, R9>,
]
// #endregion

interface RuleFactory {
  <I, O>(validate: SyncValidator<I, O>): YobtaSyncRule<I, O>
  <I, O>(validate: AsyncValidator<I, O>): AsyncRule<I, O>
}

export const ruleYobta: RuleFactory = validate => context => input =>
  // @ts-ignore
  validate(input, context)
