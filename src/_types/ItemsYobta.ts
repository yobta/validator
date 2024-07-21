import type {
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
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
} from '../_types/YobtaSyncChain.js'
import type { YobtaSyncRule, YobtaSyncRules } from '../ruleYobta/index.js'

export interface ItemsYobta {
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
  ): YobtaSyncRule<unknown[], R12[]>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    ...rules: YobtaSyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): YobtaSyncRule<unknown[], R11[]>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    ...rules: YobtaSyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): YobtaSyncRule<unknown[], R10[]>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: YobtaSyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): YobtaSyncRule<unknown[], R9[]>

  <R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: YobtaSyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): YobtaSyncRule<unknown[], R8[]>

  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: YobtaSyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): YobtaSyncRule<unknown[], R7[]>

  <R1, R2, R3, R4, R5, R6>(
    ...rules: YobtaSyncChain6<R1, R2, R3, R4, R5, R6>
  ): YobtaSyncRule<unknown[], R6[]>

  <R1, R2, R3, R4, R5>(
    ...rules: YobtaSyncChain5<R1, R2, R3, R4, R5>
  ): YobtaSyncRule<any, R5[]>

  <R1, R2, R3, R4>(
    ...rules: YobtaSyncChain4<R1, R2, R3, R4>
  ): YobtaSyncRule<unknown[], R4[]>

  <R1, R2, R3>(
    ...rules: YobtaSyncChain3<R1, R2, R3>
  ): YobtaSyncRule<unknown[], R3[]>

  <R1, R2>(...rules: YobtaSyncChain2<R1, R2>): YobtaSyncRule<unknown[], R2[]>

  <R1>(...rules: YobtaSyncChain1<R1>): YobtaSyncRule<unknown[], R1[]>

  <F extends YobtaSyncRules>(
    ...rules: SyncRulesPipeYobta<F>
  ): YobtaSyncRule<unknown[], PipeFactoryResult<F>[]>
}
