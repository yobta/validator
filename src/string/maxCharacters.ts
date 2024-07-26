import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharacters = (
  limit: () => number,
  message = maxCharactersMessage,
): YobtaSyncRule<string, string> =>
  ruleYobta<string, string>(input => {
    const l = limit()
    if (input.length > l) {
      throw new Error(message(l))
    }
    return input
  })
