import { createContext } from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { PipeFactoryResult } from '../_internal/pipe/index.js'
import type { AsyncFactoryYobta } from '../_types/AsyncFactoryYobta.js'
import type { YobtaAsyncValidatorResult } from '../_types/AsyncValidatorYobta.js'
import type { YobtaContext } from '../_types/YobtaContext.js'
import type { SyncOrAsyncRules } from '../ruleYobta/index.js'

export const asyncYobta: AsyncFactoryYobta =
  <R extends SyncOrAsyncRules>(...rules: R) =>
  async (
    data: unknown,
    context?: YobtaContext,
  ): YobtaAsyncValidatorResult<PipeFactoryResult<R>> => {
    const ctx = context || createContext(data)

    let result = data as PipeFactoryResult<R>

    for await (const rule of rules) {
      try {
        result = await rule(ctx)(result)
      } catch (error) {
        ctx.pushError(
          handleUnknownError({
            error,
            field: ctx.field,
            path: ctx.path,
          }),
        )
      }
    }

    return ctx.errors.length ? [null, ctx.errors] : [result, null]
  }
