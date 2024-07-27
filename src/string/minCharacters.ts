import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const minCharactersMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'character')}`

export const minCharacters = (
  limit: () => number,
  message = minCharactersMessage,
): YobtaSyncRule<string, string> =>
  createRule<string, string>(input => {
    if (input.length < limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
