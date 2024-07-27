import { getIn } from '../_internal/getIn/index.js'
import type { YobtaPath } from '../_types/YobtaPath.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const identicalMessage = (field: string, path: YobtaPath): string =>
  `"${field}" should be identical to "${path.join('.')}"`

export const identical = <I>(
  path: YobtaPath,
  message = identicalMessage,
): YobtaSyncRule<I, I> =>
  rule((input: I, { data, field }) => {
    if (input === getIn(data, path)) {
      return input
    }
    throw new Error(message(field, path))
  })
