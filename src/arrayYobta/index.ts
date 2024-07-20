import { isIterable } from '../_internal/isIterable/index.js'
import { isVoid } from '../_internal/isVoid/index.js'
import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const arrayYobta = <I>(): YobtaOptionalSyncRule<I, any[]> =>
  ruleYobta<I, any[] | undefined>((input: I): any[] | undefined => {
    if (input === undefined) {
      return undefined
    }

    if (isVoid(input)) {
      return []
    }

    if (Array.isArray(input)) {
      return input
    }

    if (isIterable(input)) {
      return Array.from(input)
    }

    return [input]
  })
