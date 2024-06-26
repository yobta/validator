import type {
  YobtaContext} from '../_internal/createContext/index.js';
import {
  createContext
} from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipedFactories,
  PipeFactoryResult} from '../_internal/pipe/index.js';
import {
  pipe
} from '../_internal/pipe/index.js'
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
import type { YobtaError } from '../YobtaError/index.js'

//#region Types
export type SyncYobtaRule<I, O> = (input: I) => O
export interface YobtaFactory {
  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  ): SyncYobtaRule<any, R7>
  <R1, R2, R3, R4, R5, R6>(
    ...rules: SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  ): SyncYobtaRule<any, R6>
  <R1, R2, R3, R4, R5>(
    ...rules: SyncRulesChain5<R1, R2, R3, R4, R5>
  ): SyncYobtaRule<any, R5>
  <R1, R2, R3, R4>(
    ...rules: SyncRulesChain4<R1, R2, R3, R4>
  ): SyncYobtaRule<any, R4>
  <R1, R2, R3>(...rules: SyncRulesChain3<R1, R2, R3>): SyncYobtaRule<any, R3>
  <R1, R2>(...rules: SyncRulesChain2<R1, R2>): SyncYobtaRule<any, R2>
  <R1>(...rules: SyncRulesChain1<R1>): SyncYobtaRule<any, R1>
  <R extends SyncRules>(
    ...rules: PipedFactories<R>
  ): (input: any) => PipeFactoryResult<R>
}
//#endregion

export const field = '@'

export const yobta: YobtaFactory =
  <R extends SyncRules>(...rules: R) =>
  (data: any) => {
    const context: YobtaContext = {
      ...createContext(data),
      pushError(error: YobtaError) {
        throw error
      },
    }

    const validators = rules.map(next => next(context)) as Functions

    try {
      return pipe(...validators)(data)
    } catch (error) {
      throw handleUnknownError({ error, field, path: [] })
    }
  }
