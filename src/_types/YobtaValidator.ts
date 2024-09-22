import type { YobtaContext } from './YobtaContext'
import type { YobtaPretty } from './YobtaPretty'

export interface YobtaValidator<I, O> {
  (input: I, context?: YobtaContext): YobtaPretty<O>
}
