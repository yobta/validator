import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const minCharactersMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'character')}`

export const minCharacters = (
  limit: () => number,
  message = minCharactersMessage,
): YobtaSyncRule<string, string> =>
  rule<string, string>(input => {
    if (input.length < limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
