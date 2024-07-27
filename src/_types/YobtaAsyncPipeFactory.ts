import type { SyncOrAsyncRules } from '../rule/rule.js'
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
import type { YobtaAsyncRule } from './YobtaAsyncRule.js'
import type { YobtaAsyncRulesPipe } from './YobtaAsyncRulesPipe.js'
import type { PipeFactoryResult } from './YobtaPipe.js'

export interface YobtaAsyncPipeFactory {
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
  ): YobtaAsyncRule<any, R12>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    ...rules: YobtaAsyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): YobtaAsyncRule<any, R11>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    ...rules: YobtaAsyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): YobtaAsyncRule<any, R10>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: YobtaAsyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): YobtaAsyncRule<any, R9>

  <R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: YobtaAsyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): YobtaAsyncRule<any, R8>

  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: YobtaAsyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): YobtaAsyncRule<any, R7>

  <R1, R2, R3, R4, R5, R6>(
    ...rules: YobtaAsyncChain6<R1, R2, R3, R4, R5, R6>
  ): YobtaAsyncRule<any, R6>

  <R1, R2, R3, R4, R5>(
    ...rules: YobtaAsyncChain5<R1, R2, R3, R4, R5>
  ): YobtaAsyncRule<any, R5>

  <R1, R2, R3, R4>(
    ...rules: YobtaAsyncChain4<R1, R2, R3, R4>
  ): YobtaAsyncRule<any, R4>

  <R1, R2, R3>(...rules: YobtaAsyncChain3<R1, R2, R3>): YobtaAsyncRule<any, R3>

  <R1, R2>(...rules: YobtaAsyncChain2<R1, R2>): YobtaAsyncRule<any, R2>

  <R1>(...rules: YobtaAsyncChain1<R1>): YobtaAsyncRule<any, R1>

  <R extends SyncOrAsyncRules>(
    ...rules: YobtaAsyncRulesPipe<R>
  ): YobtaAsyncRule<any, PipeFactoryResult<R>>
}
