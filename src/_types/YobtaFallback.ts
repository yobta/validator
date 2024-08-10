import type { YobtaSyncRule, YobtaSyncRules } from '../rule/rule.js'
import type { SyncRulesPipeYobta } from './YobtaPipe.js'
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

export interface YobtaFallback {
  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
    fallbackValue: R12,
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
  ): YobtaSyncRule<unknown, R12>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    fallbackValue: R11,
    ...rules: YobtaSyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): YobtaSyncRule<unknown, R11>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    fallbackValue: R10,
    ...rules: YobtaSyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): YobtaSyncRule<unknown, R10>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    fallbackValue: R9,
    ...rules: YobtaSyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): YobtaSyncRule<unknown, R9>

  <R1, R2, R3, R4, R5, R6, R7, R8>(
    fallbackValue: R8,
    ...rules: YobtaSyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): YobtaSyncRule<unknown, R8>

  <R1, R2, R3, R4, R5, R6, R7>(
    fallbackValue: R7,
    ...rules: YobtaSyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): YobtaSyncRule<unknown, R7>

  <R1, R2, R3, R4, R5, R6>(
    fallbackValue: R6,
    ...rules: YobtaSyncChain6<R1, R2, R3, R4, R5, R6>
  ): YobtaSyncRule<unknown, R6>

  <R1, R2, R3, R4, R5>(
    fallbackValue: R5,
    ...rules: YobtaSyncChain5<R1, R2, R3, R4, R5>
  ): YobtaSyncRule<unknown, R5>

  <R1, R2, R3, R4>(
    fallbackValue: R4,
    ...rules: YobtaSyncChain4<R1, R2, R3, R4>
  ): YobtaSyncRule<unknown, R4>

  <R1, R2, R3>(
    fallbackValue: R3,
    ...rules: YobtaSyncChain3<R1, R2, R3>
  ): YobtaSyncRule<unknown, R3>

  <R1, R2>(
    fallbackValue: R2,
    ...rules: YobtaSyncChain2<R1, R2>
  ): YobtaSyncRule<unknown, R2>

  <R1>(
    fallbackValue: R1,
    ...rules: YobtaSyncChain1<R1>
  ): YobtaSyncRule<unknown, R1>

  <F extends YobtaSyncRules, R>(
    fallbackValue: R,
    ...rules: SyncRulesPipeYobta<F>
  ): YobtaSyncRule<unknown, R>

  <I, R>(fallbackValue: R, ...rules: never[]): YobtaSyncRule<I, I | R>
}
