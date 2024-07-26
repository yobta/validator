import type { YobtaAsyncRule } from '../_types/YobtaAsyncRule'
import type { YobtaContext } from '../_types/YobtaContext'

// #region SyncRules

export type YobtaSyncRule<I, O> = (context: YobtaContext) => (input: I) => O

export type YobtaSyncRules = [YobtaAnySyncRule, ...YobtaAnySyncRule[]]
export type YobtaAnySyncRule = YobtaSyncRule<any, any>

// #endregion

// #region AsyncRules
type Validate<I, O> = (input: I, context: YobtaContext) => O
type AsyncValidate<I, O> = Validate<I, Promise<O>>

export type AnyAsyncRule = YobtaAsyncRule<any, any>
export type AnySyncOrAsyncRule = AnyAsyncRule | YobtaAnySyncRule
export type SyncOrAsyncRules = [AnySyncOrAsyncRule, ...AnySyncOrAsyncRule[]]
export type SyncOrAsyncRule<I, O> = YobtaSyncRule<Awaited<I>, O>

// #endregion

interface RuleFactory {
  <I, O>(validate: AsyncValidate<I, O>): YobtaAsyncRule<I, O>
  <I, O>(validate: Validate<I, O>): YobtaSyncRule<I, O>
}

export const ruleYobta: RuleFactory = validate => context => input =>
  // @ts-ignore
  validate(input, context)
