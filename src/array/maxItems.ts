import { pluralizeEn } from '../_internal/pluralizeEn/index.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaOptionaUnknownArray } from '../_types/YobtaOptionaUnknownArray.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxItemsMessage = (limit: number): string =>
  `It should be within ${pluralizeEn(limit, 'item')}`

export const maxItems = <I extends YobtaOptionaUnknownArray>(
  limit: number,
  message = maxItemsMessage,
): YobtaSyncRule<I, YobtaMaybe<I, I>> =>
  rule((input: I) => {
    if (input && input.length > limit) {
      throw new Error(message(limit))
    }

    return input
  }) as YobtaSyncRule<I, YobtaMaybe<I, I>>
