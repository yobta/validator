import { createRule } from '../createRule/index.js'
import { pluralizeEn } from '../pluralizeEn/index.js'

export const maxCharactersMessage = limit =>
  `Should be within ${pluralizeEn(limit, 'character')}`

export const maxCharactersYobta = (limit, message = maxCharactersMessage) =>
  createRule(input => {
    if (input.length > limit) throw new Error(message(limit))

    return input
  })
