import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import { getMessage } from '../_internal/getMessage/getMessage.js'

export const minCharactersMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'character')}`

export const minCharactersYobta = (
  limit: number,
  message: typeof minCharactersMessage | string = minCharactersMessage,
): SyncRule<string, string> =>
  ruleYobta(input => {
    if (input.length < limit) throw new Error(getMessage(message, limit))

    return input
  })
