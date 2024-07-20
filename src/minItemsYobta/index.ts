import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const minItemsMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'item')}`

export const minItemsYobta = <I extends unknown[]>(
  limit: number,
  message = minItemsMessage,
): SyncRule<I, I> =>
  ruleYobta(input => {
    if (input.length < limit) {
      throw new Error(message(limit))
    }

    return input
  })
