import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxCharactersMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'character')}`

export const maxCharacters = <I extends string | undefined>(
  limit: () => number,
  message = maxCharactersMessage,
): YobtaSyncRule<I, YobtaMaybe<I, string>> =>
  rule((input: I) => {
    if (input !== undefined && input.length > limit()) {
      throw new Error(message(limit()))
    }
    return input as unknown as YobtaMaybe<I, string>
  })
