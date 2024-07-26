import { isIterable } from '../_internal/isIterable/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const array = (): YobtaSyncRule<unknown, unknown[]> =>
  ruleYobta<unknown, unknown[]>((input = []): any[] => {
    if (isIterable(input)) {
      return Array.from(input)
    }

    return [input]
  })
