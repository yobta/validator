import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaItems, YobtaItemsInput } from '../_types/YobtaItems.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { YobtaSyncRule, YobtaSyncRules } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const items: YobtaItems = <
  R extends YobtaSyncRules,
  I extends YobtaItemsInput = YobtaItemsInput,
>(
  ...rules: R
) => {
  return rule((input: I, context) => {
    return input
      ? input.map((item, index) => {
          try {
            let next = item
            for (const test of rules) {
              next = test(context)(next)
            }
            return next as PipeFactoryResult<R>
          } catch (error) {
            throw handleUnknownError({
              error,
              field: context.field,
              path: [...context.path, index],
            })
          }
        })
      : input
  }) as YobtaSyncRule<I, YobtaMaybe<I, PipeFactoryResult<R>[]>>
}
