import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxItemsMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'item')}`

export const maxItems = <I extends unknown[]>(
  limit: () => number,
  message = maxItemsMessage,
): YobtaSyncRule<I, I> =>
  rule<I, I>(input => {
    if (input.length > limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
