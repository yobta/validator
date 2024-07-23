import type {
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import type { YobtaSyncRules } from '../ruleYobta/index.js'
import type { YobtaValidator } from './YobtaValidator.js'
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

export interface YobtaValidatorFactory {
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
  ): YobtaValidator<any, R12>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    ...rules: YobtaSyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): YobtaValidator<any, R11>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    ...rules: YobtaSyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): YobtaValidator<any, R10>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: YobtaSyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): YobtaValidator<any, R9>

  <R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: YobtaSyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): YobtaValidator<any, R8>

  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: YobtaSyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): YobtaValidator<any, R7>

  <R1, R2, R3, R4, R5, R6>(
    ...rules: YobtaSyncChain6<R1, R2, R3, R4, R5, R6>
  ): YobtaValidator<any, R6>

  <R1, R2, R3, R4, R5>(
    ...rules: YobtaSyncChain5<R1, R2, R3, R4, R5>
  ): YobtaValidator<any, R5>

  <R1, R2, R3, R4>(
    ...rules: YobtaSyncChain4<R1, R2, R3, R4>
  ): YobtaValidator<any, R4>

  <R1, R2, R3>(...rules: YobtaSyncChain3<R1, R2, R3>): YobtaValidator<any, R3>

  <R1, R2>(...rules: YobtaSyncChain2<R1, R2>): YobtaValidator<any, R2>

  <R1>(...rules: YobtaSyncChain1<R1>): YobtaValidator<any, R1>

  <R extends YobtaSyncRules>(
    ...rules: SyncRulesPipeYobta<R>
  ): YobtaValidator<any, PipeFactoryResult<R>>
}
