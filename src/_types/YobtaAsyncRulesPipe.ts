import type { AnySyncOrAsyncRule } from '../ruleYobta'
import type { ArgType, ExtractReturnTypes, Lookup, Tail } from './YobtaPipe'

export type YobtaAsyncRulesPipe<F extends AnySyncOrAsyncRule[]> = F &
  YobtaAsyncFactoryChain<F>

type YobtaAsyncFactoryChain<
  Rules extends AnySyncOrAsyncRule[],
  RestRules extends AnySyncOrAsyncRule[] = Tail<Rules>,
> = {
  [K in keyof Rules]: (
    arg: ArgType<YobtaAsyncFactoryProduct<Rules, RestRules, K>>,
  ) => YobtaAsyncFactoryProduct<Rules, RestRules, K>
}

type YobtaAsyncFactoryProduct<
  F extends AnySyncOrAsyncRule[],
  T extends AnySyncOrAsyncRule[],
  K extends keyof F,
> = (arg: ArgType<F>) => ArgType<Lookup<ExtractReturnTypes<T>, K, any>, any>
