import { createRule, Rule } from '../createRule'
import { pluralizeEn } from '../pluralizeEn'

export const minItemsMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'item')}`

export const minItemsYobta = <I extends any[]>(
  limit: number,
  message = minItemsMessage
): Rule<I, I> =>
  createRule(input => {
    if (input.length < limit) throw new Error(message(limit))

    return input
  })
