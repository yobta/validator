import type { YobtaPathSegment } from '../_types/YobtaPath.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const identicalMessage = (
  field: string,
  path: YobtaPathSegment,
): string => `"${field}" should be identical to "${path}"`

export const identical = <I>(
  path: () => YobtaPathSegment,
  message = identicalMessage,
): YobtaSyncRule<I, I> =>
  rule((input: I, { data, field }) => {
    if (input === (data as any)[path()]) {
      return input
    }
    throw new Error(message(field, path()))
  })
