import { getIn } from '../_internal/getIn/index.js'
import type { YobtaPath } from '../_types/YobtaPath.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const identicalMessage = (path: YobtaPath): string =>
  `It should be identical to "${path.join('.')}"`

export const identical = <I>(
  path: YobtaPath,
  message = identicalMessage,
): YobtaSyncRule<I, I> =>
  createRule((input: I, { data }) => {
    if (input === getIn(data, path)) {
      return input
    }
    throw new Error(message(path))
  })
