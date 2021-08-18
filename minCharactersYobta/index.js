import { createRule } from '../createRule/index.js'
import { pluralizeEn } from '../pluralizeEn/index.js'

export const minCharactersMessage = limit =>
  `Should have at least ${pluralizeEn(limit, 'character')}`

export const minCharactersYobta = (limit, message = minCharactersMessage) =>
  createRule(input => {
    if (input.length < limit) throw new Error(message(limit))

    return input
  })
