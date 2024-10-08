import type { YobtaAnySyncRule, YobtaSyncRules } from '../rule/rule.js'

export type SyncRulesPipeYobta<F extends YobtaSyncRules> = AsFactoryChain<F> & F

type AsFactoryChain<
  Rules extends YobtaSyncRules,
  RestRules extends YobtaAnySyncRule[] = Tail<Rules>,
> = {
  [K in keyof Rules]: (
    arg: ArgType<FactoryProduct<Rules, RestRules, K>>,
  ) => FactoryProduct<Rules, RestRules, K>
}

export type FactoryProduct<
  F extends YobtaSyncRules,
  T extends YobtaAnySyncRule[],
  K extends keyof F,
> = (arg: ArgType<F>) => ArgType<Lookup<ExtractReturnTypes<T>, K, any>, any>

export type ExtractReturnTypes<T extends Func1[]> = {
  [P in keyof T]: T[P] extends (a: ArgType<T[P]>) => infer R
    ? Awaited<R>
    : never
}

export type PipeFactoryResult<F extends YobtaSyncRules> = LaxReturnType<
  Last<ExtractReturnTypes<F>>
>

export type Lookup<T, K extends keyof any, Else = never> = K extends keyof T
  ? T[K]
  : Else
export type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never
export type Func1 = (arg: any) => any
export type ArgType<F, Else = never> = F extends (arg: infer A) => any
  ? A
  : Else
type AsChain<F extends Functions, G extends Func1[] = Tail<F>> = {
  [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any>
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Last<T extends any[]> = T extends [...infer F, infer L] ? L : never
export type LaxReturnType<F> = F extends (...args: any) => infer R ? R : never

export type Functions = [Func1, ...Func1[]]
export type PipedFunctions<F extends Functions> = AsChain<F> & F
export type PipeResult<F extends Functions> = LaxReturnType<Last<F>>
export type PipeFunction<F extends Functions, I> = (
  ...functions: PipedFunctions<F>
) => (input: I) => PipeResult<F>

export type ThenArgRecursive<T> =
  T extends PromiseLike<infer U> ? ThenArgRecursive<U> : T
