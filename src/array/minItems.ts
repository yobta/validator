import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const minItemsMessage = (limit: number): string =>
  `It should have at least ${pluralizeEn(limit, 'item')}`

export const minItems = <I extends unknown[]>(
  limit: () => number,
  message = minItemsMessage,
): YobtaSyncRule<I, I> =>
  createRule<I, I>(input => {
    if (input.length < limit()) {
      throw new Error(message(limit()))
    }

    return input
  })
