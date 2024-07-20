import type { YobtaContext } from './YobtaContext.js'
import type { YobtaOptionalIfUnkown } from './YobtaOptionalIfUnkown.js'
import type { YobtaPretty } from './YobtaPretty.js'

export type YobtaOptionalSyncRule<I, O> = (
  context: YobtaContext,
) => (input: I) => YobtaOptionalIfUnkown<I, YobtaPretty<O>>
