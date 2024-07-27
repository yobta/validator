import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharacters = (
  limit: () => number,
  message = maxCharactersMessage,
): YobtaSyncRule<string, string> =>
  rule<string, string>(input => {
    if (input.length > limit()) {
      throw new Error(message(limit()))
    }
    return input
  })
