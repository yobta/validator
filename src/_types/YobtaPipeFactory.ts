import type { YobtaSyncRule, YobtaSyncRules } from '../createRule/createRule.js'
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

export interface YobtaPipeFactory {
  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
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
  ): YobtaSyncRule<any, R12>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    ...rules: YobtaSyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): YobtaSyncRule<any, R11>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    ...rules: YobtaSyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): YobtaSyncRule<any, R10>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: YobtaSyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): YobtaSyncRule<any, R9>

  <R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: YobtaSyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): YobtaSyncRule<any, R8>

  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: YobtaSyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): YobtaSyncRule<any, R7>

  <R1, R2, R3, R4, R5, R6>(
    ...rules: YobtaSyncChain6<R1, R2, R3, R4, R5, R6>
  ): YobtaSyncRule<any, R6>

  <R1, R2, R3, R4, R5>(
    ...rules: YobtaSyncChain5<R1, R2, R3, R4, R5>
  ): YobtaSyncRule<any, R5>

  <R1, R2, R3, R4>(
    ...rules: YobtaSyncChain4<R1, R2, R3, R4>
  ): YobtaSyncRule<any, R4>

  <R1, R2, R3>(...rules: YobtaSyncChain3<R1, R2, R3>): YobtaSyncRule<any, R3>

  <R1, R2>(...rules: YobtaSyncChain2<R1, R2>): YobtaSyncRule<any, R2>

  <R1>(...rules: YobtaSyncChain1<R1>): YobtaSyncRule<any, R1>

  <R extends YobtaSyncRules>(
    ...rules: SyncRulesPipeYobta<R>
  ): YobtaSyncRule<any, PipeFactoryResult<R>>
}
