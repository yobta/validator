import type { YobtaContext } from '../_types/YobtaContext'
import type { YobtaUnwrapPromise } from '../_types/YobtaUnwrapPromise'

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
) => (input: I) => Promise<O>

export type AnyAsyncRule = AsyncRule<any, any>
export type AnySyncOrAsyncRule = AnyAsyncRule | YobtaAnySyncRule
export type SyncOrAsyncRules = [AnySyncOrAsyncRule, ...AnySyncOrAsyncRule[]]
export type SyncOrAsyncRule<I, O> = YobtaSyncRule<YobtaUnwrapPromise<I>, O>

// #endregion

interface RuleFactory {
  <I, O>(validate: SyncValidator<I, O>): YobtaSyncRule<I, O>
  <I, O>(validate: AsyncValidator<I, O>): AsyncRule<I, O>
}

export const ruleYobta: RuleFactory = validate => context => input =>
  // @ts-ignore
  validate(input, context)
