import type { YobtaAsyncResult } from '../_types/YobtaAsyncResult'
import type { YobtaPretty } from '../_types/YobtaPretty'

export type YobtaAsyncRule<I, O> = (
  input: I,
) => YobtaAsyncResult<YobtaPretty<O>>
