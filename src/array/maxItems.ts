import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maxItemsMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'item')}`

export const maxItems = <I extends unknown[]>(
  limit: () => number,
  message = maxItemsMessage,
): YobtaSyncRule<I, I> =>
  ruleYobta<I, I>(input => {
    const l = limit()
    if (input.length > l) {
      throw new Error(message(l))
    }

    return input
  })