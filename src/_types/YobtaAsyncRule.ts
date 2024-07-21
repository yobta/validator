import type { YobtaPretty } from '../_types/YobtaPretty'
import type { YobtaAsyncResult } from '../_types/YobtaAsyncResult'

export type YobtaAsyncRule<I, O> = (
  input: I,
) => YobtaAsyncResult<YobtaPretty<O>>
