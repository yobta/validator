import type { YobtaAsyncFailure } from './YobtaAsyncFailure'
import type { YobtaAsyncSuccess } from './YobtaAsyncSuccess'
import type { YobtaPretty } from './YobtaPretty'

export type YobtaAsyncResult<R = unknown> = Promise<
  YobtaPretty<YobtaAsyncFailure> | YobtaPretty<YobtaAsyncSuccess<R>>
>
