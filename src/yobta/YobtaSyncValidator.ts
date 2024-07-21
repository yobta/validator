import type { YobtaPretty } from '../_types/YobtaPretty'

export type SyncValidatorYobta<I, O> = (input: I) => YobtaPretty<O>
