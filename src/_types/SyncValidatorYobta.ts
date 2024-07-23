import type { YobtaContext } from './YobtaContext'
import type { YobtaPretty } from './YobtaPretty'

export interface SyncValidatorYobta<I, O> {
  (input: I, context?: YobtaContext): YobtaPretty<O>
}
