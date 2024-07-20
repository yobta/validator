import { getIn } from '../_internal/getIn/index.js'
import type { YobtaPath } from '../_types/YobtaPath.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const identicalMessage = (path: YobtaPath): string =>
  `It should be identical to "${path.join('.')}"`

export function identicalYobta<I>(
  path: YobtaPath,
  message = identicalMessage,
): SyncRule<any, I> {
  return ruleYobta((input, { data }) => {
    if (input === getIn(data, path)) return input
    throw new Error(message(path))
  })
}
