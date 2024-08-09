import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const minCharactersMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'character')}`

export const minCharacters = <I extends string | undefined>(
  limit: () => number,
  message = minCharactersMessage,
): YobtaSyncRule<I, YobtaMaybe<I, string>> =>
  rule((input: I) => {
    if (input !== undefined && input.length < limit()) {
      throw new Error(message(limit()))
    }

    return input as unknown as YobtaMaybe<I, string>
  })
