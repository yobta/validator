import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import { getMessage } from '../_internal/getMessage/getMessage.js'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharactersYobta = (
  limit: number,
  message: typeof maxCharactersMessage | string = maxCharactersMessage,
): SyncRule<string, string> =>
  ruleYobta(input => {
    if (input.length > limit) throw new Error(getMessage(message, limit))

    return input
  })
