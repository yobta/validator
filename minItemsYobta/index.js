import { createRule } from '../createRule/index.js'
import { pluralizeEn } from '../pluralizeEn/index.js'

export const minItemsMessage = limit =>
  `Should have at least ${pluralizeEn(limit, 'item')}`

export const minItemsYobta = (limit, message = minItemsMessage) =>
  createRule(input => {
    if (input.length < limit) throw new Error(message(limit))

    return input
  })
