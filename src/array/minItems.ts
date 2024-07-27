import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const minItemsMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'item')}`

export const minItems = <I extends unknown[]>(
  limit: () => number,
  message = minItemsMessage,
): YobtaSyncRule<I, I> =>
  rule<I, I>(input => {
    if (input.length < limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
