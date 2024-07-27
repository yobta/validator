import type { YobtaPretty } from '../_types/YobtaPretty'
import type { YobtaSyncRule } from '../rule/rule'

export type YobtaAsyncRule<I, O> = YobtaSyncRule<
  any | I,
  Promise<YobtaPretty<O>>
>
