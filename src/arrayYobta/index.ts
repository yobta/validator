import { isVoid } from '../_internal/isVoid/index.js'
import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { ruleYobta } from '../ruleYobta/index.js'

function isIterable<T>(value: T): value is Iterable<unknown> & T {
  return typeof value === 'object' && value !== null && Symbol.iterator in value
}

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
