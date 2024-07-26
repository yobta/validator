import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharacters = (
  limit: number,
  message = maxCharactersMessage,
): YobtaSyncRule<string, string> =>
  ruleYobta<string, string>(input => {
    if (input.length > limit) {
      throw new Error(message(limit))
    }
    return input
  })
