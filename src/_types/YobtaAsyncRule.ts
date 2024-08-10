import type { YobtaPretty } from '../_types/YobtaPretty'
import type { YobtaSyncRule } from '../rule/rule'

export type YobtaAsyncRule<I extends any, O> = YobtaSyncRule<
  I,
  Promise<YobtaPretty<O>>
>
