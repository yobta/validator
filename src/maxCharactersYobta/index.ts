import { ruleYobta, SyncRule } from '../ruleYobta'
import { pluralizeEn } from '../_internal/pluralizeEn'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharactersYobta = (
  limit: number,
  message = maxCharactersMessage
): SyncRule<string, string> =>
  ruleYobta(input => {
    if (input.length > limit) throw new Error(message(limit))

    return input
  })
