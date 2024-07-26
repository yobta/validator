import { handleUnknownError } from '../../_internal/parseUnknownError/index.js'
import type { YobtaItems } from '../../_types/YobtaItems.js'
import type { PipeFactoryResult } from '../../_types/YobtaPipe.js'
import type { YobtaSyncRule, YobtaSyncRules } from '../../ruleYobta/index.js'
import { ruleYobta } from '../../ruleYobta/index.js'

export const items: YobtaItems = <R extends YobtaSyncRules>(
  ...rules: R
): YobtaSyncRule<unknown[], PipeFactoryResult<R>[]> => {
  return ruleYobta((input: unknown[], context) => {
    return input.map((item, index) => {
      try {
        let next = item
        for (const rule of rules) {
          next = rule(context)(next)
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
  })
}
