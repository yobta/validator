import { createRule, Rule } from '../createRule'
import { pluralizeEn } from '../pluralizeEn'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharactersYobta = (
  limit: number,
  message = maxCharactersMessage
): Rule<string, string> =>
  createRule(input => {
    if (input.length > limit) throw new Error(message(limit))

    return input
  })
