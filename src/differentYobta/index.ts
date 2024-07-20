import { getIn } from '../_internal/getIn/index.js'
import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import type { YobtaPath } from '../_types/YobtaPath.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const differentMessage = (path: YobtaPath): string =>
  `It should be different from "${path.join('.')}"`

export function differentYobta<I>(
  path: YobtaPath,
  message = differentMessage,
): YobtaOptionalSyncRule<any, I> {
  return ruleYobta((input, { data }) => {
    if (input === getIn(data, path)) {
      throw new Error(message(path))
    }
    return input
  })
}
