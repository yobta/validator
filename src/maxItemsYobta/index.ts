import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import { getMessage } from '../_internal/getMessage/getMessage.js'

export const maxItemsMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'item')}`

export const maxItemsYobta = <I extends any[]>(
  limit: number,
  message: typeof maxItemsMessage | string = maxItemsMessage,
): SyncRule<I, I> =>
  ruleYobta(input => {
    if (input.length > limit) throw new Error(getMessage(message, limit))

    return input
  })
