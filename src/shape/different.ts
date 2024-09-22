import type { YobtaPathSegment } from '../_types/YobtaPath.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const differentMessage = (
  field: string,
  path: YobtaPathSegment,
): string => `"${field}" should be different from "${path}"`

export const different = <I>(
  path: YobtaPathSegment,
  message = differentMessage,
): YobtaSyncRule<I, I> =>
  rule((input: I, { data, field }) => {
    if (input === (data as any)[path]) {
      throw new Error(message(field, path))
    }
    return input
  })
