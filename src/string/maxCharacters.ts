import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharacters = (
  limit: () => number,
  message = maxCharactersMessage,
): YobtaSyncRule<string, string> =>
  createRule<string, string>(input => {
    if (input.length > limit()) {
      throw new Error(message(limit()))
    }
    return input
  })
