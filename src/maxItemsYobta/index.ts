import { createRule, SyncRule } from '../createRule'
import { pluralizeEn } from '../_internal/pluralizeEn'

export const maxItemsMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'item')}`

export const maxItemsYobta = <I extends any[]>(
  limit: number,
  message = maxItemsMessage
): SyncRule<I, I> =>
  createRule(input => {
    if (input.length > limit) throw new Error(message(limit))

    return input
  })
