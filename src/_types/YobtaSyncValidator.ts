import type { YobtaPretty } from '../_types/YobtaPretty'
import type { YobtaContext } from './YobtaContext'

export type SyncValidatorYobta<I, O> = (
  input: I,
  context?: YobtaContext,
) => YobtaPretty<O>
