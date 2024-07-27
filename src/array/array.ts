import { isIterable } from '../_internal/isIterable/index.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const array = (): YobtaSyncRule<unknown, unknown[]> =>
  createRule<unknown, unknown[]>((input = []): unknown[] => {
    if (isIterable(input)) {
      return Array.from(input)
    }

    return [input]
  })
