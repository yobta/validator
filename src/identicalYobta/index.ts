import { getIn } from '../_internal/getIn/index.js'
import type { YobtaPath } from '../_types/YobtaPath.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const identicalMessage = (path: YobtaPath): string =>
  `It should be identical to "${path.join('.')}"`

export const identicalYobta = <I>(
  path: YobtaPath,
  message = identicalMessage,
): YobtaSyncRule<I, I> =>
  ruleYobta((input: I, { data }) => {
    if (input === getIn(data, path)) {
      return input
    }
    throw new Error(message(path))
  })
