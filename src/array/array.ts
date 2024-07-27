import { isIterable } from '../_internal/isIterable/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const array = (): YobtaSyncRule<unknown, unknown[]> =>
  rule<unknown, unknown[]>((input = []): unknown[] => {
    if (isIterable(input)) {
      return Array.from(input)
    }

    return [input]
  })
