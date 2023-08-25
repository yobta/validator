import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import { getMessage } from '../_internal/getMessage/getMessage.js'

export const minItemsMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'item')}`

export const minItemsYobta = <I extends any[]>(
  limit: number,
  message: typeof minItemsMessage | string = minItemsMessage,
): SyncRule<I, I> =>
  ruleYobta(input => {
    if (input.length < limit) throw new Error(getMessage(message, limit))

    return input
  })
