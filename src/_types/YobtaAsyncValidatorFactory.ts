import type { PipeFactoryResult } from './YobtaPipe.js'
import type { SyncOrAsyncRules } from '../ruleYobta/index.js'
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
import type { YobtaAsyncRulesPipe } from './YobtaAsyncRulesPipe.js'
import type { YobtaAsyncValidator } from './YobtaAsyncValidator.js'

export interface YobtaAsyncValidatorFactory {
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
  ): YobtaAsyncValidator<unknown, R12>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    ...rules: YobtaAsyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>
  ): YobtaAsyncValidator<unknown, R11>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    ...rules: YobtaAsyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
  ): YobtaAsyncValidator<unknown, R10>

  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    ...rules: YobtaAsyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>
  ): YobtaAsyncValidator<unknown, R9>

  <R1, R2, R3, R4, R5, R6, R7, R8>(
    ...rules: YobtaAsyncChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  ): YobtaAsyncValidator<unknown, R8>

  <R1, R2, R3, R4, R5, R6, R7>(
    ...rules: YobtaAsyncChain7<R1, R2, R3, R4, R5, R6, R7>
  ): YobtaAsyncValidator<unknown, R7>

  <R1, R2, R3, R4, R5, R6>(
    ...rules: YobtaAsyncChain6<R1, R2, R3, R4, R5, R6>
  ): YobtaAsyncValidator<unknown, R6>

  <R1, R2, R3, R4, R5>(
    ...rules: YobtaAsyncChain5<R1, R2, R3, R4, R5>
  ): YobtaAsyncValidator<unknown, R5>

  <R1, R2, R3, R4>(
    ...rules: YobtaAsyncChain4<R1, R2, R3, R4>
  ): YobtaAsyncValidator<unknown, R4>

  <R1, R2, R3>(
    ...rules: YobtaAsyncChain3<R1, R2, R3>
  ): YobtaAsyncValidator<unknown, R3>

  <R1, R2>(...rules: YobtaAsyncChain2<R1, R2>): YobtaAsyncValidator<unknown, R2>

  <R1>(...rules: YobtaAsyncChain1<R1>): YobtaAsyncValidator<unknown, R1>

  <R extends SyncOrAsyncRules>(
    ...rules: YobtaAsyncRulesPipe<R>
  ): YobtaAsyncValidator<unknown, PipeFactoryResult<R>>
}
