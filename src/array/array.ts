import { isIterable } from '../_internal/isIterable/index.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const array = <I>(): YobtaSyncRule<I, YobtaMaybe<I, unknown[]>> =>
  rule((input: I): YobtaMaybe<I, unknown[]> => {
    if (!input) {
      return undefined as YobtaMaybe<I, unknown[]>
    }

    if (isIterable(input) && typeof input !== 'string') {
      return Array.from(input)
    }

    return [input]
  })
