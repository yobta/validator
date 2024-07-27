import { getIn } from '../_internal/getIn/index.js'
import type { YobtaPath } from '../_types/YobtaPath.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const differentMessage = (field: string, path: YobtaPath): string =>
  `"${field}" should be different from "${path.join('.')}"`

export const different = <I>(
  path: () => YobtaPath,
  message = differentMessage,
): YobtaSyncRule<I, I> =>
  createRule<I, I>((input, { data, field }) => {
    if (input === getIn(data, path())) {
      throw new Error(message(field, path()))
    }
    return input
  })
