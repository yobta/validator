import type { YobtaError } from '../YobtaError'
import type { YobtaContext } from './YobtaContext'
import type { YobtaPretty } from './YobtaPretty'

export interface YobtaAsyncValidator<I, O> {
  (input: I, context?: YobtaContext): YobtaAsyncValidatorResult<O>
}

export type YobtaAsyncValidatorResult<O> = Promise<
  [null, YobtaError[]] | [YobtaPretty<Awaited<O>>, null]
>
