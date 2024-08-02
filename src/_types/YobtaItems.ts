import type { YobtaSyncRule, YobtaSyncRules } from '../rule/rule.js'
import type { YobtaMaybe } from './YobtaMaybe.js'
import type { YobtaOptionaUnknownArray } from './YobtaOptionaUnknownArray.js'
import type { PipeFactoryResult, SyncRulesPipeYobta } from './YobtaPipe.js'
import type {
  YobtaSyncChain1,
  YobtaSyncChain10,
  YobtaSyncChain11,
  YobtaSyncChain12,
  YobtaSyncChain2,
  YobtaSyncChain3,
  YobtaSyncChain4,
  YobtaSyncChain5,
  YobtaSyncChain6,
  YobtaSyncChain7,
  YobtaSyncChain8,
  YobtaSyncChain9,
} from './YobtaSyncChain.js'

export interface YobtaItems {
  <
    I extends YobtaOptionaUnknownArray,
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
    R12,
  >(
    ...rules: YobtaSyncChain12<
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
  ): YobtaSyncRule<I, YobtaMaybe<I, R12[]>>

  <
    I extends YobtaOptionaUnknownArray,
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
  >(
    ...rules: YobtaSyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): YobtaSyncRule<I, YobtaMaybe<I, R11[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    ...rules: YobtaSyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): YobtaSyncRule<I, YobtaMaybe<I, R10[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: YobtaSyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): YobtaSyncRule<I, YobtaMaybe<I, R9[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: YobtaSyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): YobtaSyncRule<I, YobtaMaybe<I, R8[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3, R4, R5, R6, R7>(
    ...rules: YobtaSyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): YobtaSyncRule<I, YobtaMaybe<I, R7[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3, R4, R5, R6>(
    ...rules: YobtaSyncChain6<R1, R2, R3, R4, R5, R6>
  ): YobtaSyncRule<I, YobtaMaybe<I, R6[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3, R4, R5>(
    ...rules: YobtaSyncChain5<R1, R2, R3, R4, R5>
  ): YobtaSyncRule<I, YobtaMaybe<I, R5[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3, R4>(
    ...rules: YobtaSyncChain4<R1, R2, R3, R4>
  ): YobtaSyncRule<I, YobtaMaybe<I, R4[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2, R3>(
    ...rules: YobtaSyncChain3<R1, R2, R3>
  ): YobtaSyncRule<I, YobtaMaybe<I, R3[]>>

  <I extends YobtaOptionaUnknownArray, R1, R2>(
    ...rules: YobtaSyncChain2<R1, R2>
  ): YobtaSyncRule<I, YobtaMaybe<I, R2[]>>

  <I extends YobtaOptionaUnknownArray, R1>(
    ...rules: YobtaSyncChain1<R1>
  ): YobtaSyncRule<I, YobtaMaybe<I, R1[]>>

  <I extends YobtaOptionaUnknownArray, F extends YobtaSyncRules>(
    ...rules: SyncRulesPipeYobta<F>
  ): YobtaSyncRule<I, YobtaMaybe<I, PipeFactoryResult<F>[]>>
}
