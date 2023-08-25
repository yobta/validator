import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const minCharactersMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'character')}`

export const minCharactersYobta = (
  limit: number,
  message = minCharactersMessage,
): SyncRule<string, string> =>
  ruleYobta(input => {
    if (input.length < limit) throw new Error(message(limit))

    return input
  })
