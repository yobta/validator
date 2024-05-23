import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { SyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharactersYobta = (
  limit: number,
  message = maxCharactersMessage,
): SyncRule<string, string> =>
  ruleYobta(input => {
    if (input.length > limit) throw new Error(message(limit))

    return input
  })
