import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { Functions, PipeFactoryResult } from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type { YobtaSyncRule, YobtaSyncRules } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'
import type { ItemsYobta } from './ItemsYobta.js'

export const itemsYobta: ItemsYobta = <R extends YobtaSyncRules>(
  ...rules: R
): YobtaSyncRule<unknown[], PipeFactoryResult<R>[]> => {
  return ruleYobta((input: unknown[], context) => {
    const next = rules.map(rule => rule(context)) as Functions

    return input.map((item, index) => {
      try {
        return pipe(...next)(item)
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
