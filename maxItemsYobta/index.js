import { createRule } from '../createRule/index.js'
import { pluralizeEn } from '../pluralizeEn/index.js'

export const maxItemsMessage = limit =>
  `Should be within ${pluralizeEn(limit, 'item')}`

export const maxItemsYobta = (limit, message = maxItemsMessage) =>
  createRule(input => {
    if (input.length > limit) throw new Error(message(limit))

    return input
  })
