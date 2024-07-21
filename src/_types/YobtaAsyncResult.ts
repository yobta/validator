import type { YobtaPretty } from './YobtaPretty'
import type { YobtaAsyncFailure } from './YobtaAsyncFailure'
import type { YobtaAsyncSuccess } from './YobtaAsyncSuccess'

export type YobtaAsyncResult<R = unknown> = Promise<
  YobtaPretty<YobtaAsyncFailure> | YobtaPretty<YobtaAsyncSuccess<R>>
>
