import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const minCharactersMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'character')}`

export const minCharacters = (
  limit: () => number,
  message = minCharactersMessage,
): YobtaSyncRule<string, string> =>
  ruleYobta<string, string>(input => {
    const l = limit()
    if (input.length < l) {
      throw new Error(message(l))
    }

    return input
  })
