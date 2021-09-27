import { createRule, SyncRule } from '../createRule'
import { pluralizeEn } from '../_internal/pluralizeEn'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharactersYobta = (
  limit: number,
  message = maxCharactersMessage
): SyncRule<string, string> =>
  createRule(input => {
    if (input.length > limit) throw new Error(message(limit))

    return input
  })
