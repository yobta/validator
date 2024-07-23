import type {
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import type { SyncOrAsyncRules } from '../ruleYobta/index.js'
import type { AsyncValidatorYobta } from './AsyncValidatorYobta.js'
import type {
  YobtaAsyncChain1,
  YobtaAsyncChain10,
  YobtaAsyncChain11,
  YobtaAsyncChain12,
  YobtaAsyncChain2,
  YobtaAsyncChain3,
  YobtaAsyncChain4,
  YobtaAsyncChain5,
  YobtaAsyncChain6,
  YobtaAsyncChain7,
  YobtaAsyncChain8,
  YobtaAsyncChain9,
} from './YobtaAsyncChain.js'

export interface AsyncFactoryYobta {
  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
    ...rules: YobtaAsyncChain12<
      R1,
      R2,
      R3,
      R4,
      R5,
      R6,
      R7,
      R8,
      R9,
      R10,
      R11,
      R12
    >
  ): AsyncValidatorYobta<unknown, R12>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    ...rules: YobtaAsyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): AsyncValidatorYobta<unknown, R11>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    ...rules: YobtaAsyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): AsyncValidatorYobta<unknown, R10>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: YobtaAsyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): AsyncValidatorYobta<unknown, R9>

  <R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: YobtaAsyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): AsyncValidatorYobta<unknown, R8>

  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: YobtaAsyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): AsyncValidatorYobta<unknown, R7>

  <R1, R2, R3, R4, R5, R6>(
    ...rules: YobtaAsyncChain6<R1, R2, R3, R4, R5, R6>
  ): AsyncValidatorYobta<unknown, R6>

  <R1, R2, R3, R4, R5>(
    ...rules: YobtaAsyncChain5<R1, R2, R3, R4, R5>
  ): AsyncValidatorYobta<unknown, R5>

  <R1, R2, R3, R4>(
    ...rules: YobtaAsyncChain4<R1, R2, R3, R4>
  ): AsyncValidatorYobta<unknown, R4>

  <R1, R2, R3>(
    ...rules: YobtaAsyncChain3<R1, R2, R3>
  ): AsyncValidatorYobta<unknown, R3>

  <R1, R2>(...rules: YobtaAsyncChain2<R1, R2>): AsyncValidatorYobta<unknown, R2>

  <R1>(...rules: YobtaAsyncChain1<R1>): AsyncValidatorYobta<unknown, R1>

  <R extends SyncOrAsyncRules>(
    ...rules: SyncRulesPipeYobta<R>
  ): AsyncValidatorYobta<unknown, PipeFactoryResult<R>>
}
