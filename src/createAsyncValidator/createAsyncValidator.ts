import { createContext } from '../_internal/createContext/createContext.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaAsyncValidatorResult } from '../_types/YobtaAsyncValidator.js'
import type { YobtaAsyncValidatorFactory } from '../_types/YobtaAsyncValidatorFactory.js'
import type { YobtaContext } from '../_types/YobtaContext.js'
import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { SyncOrAsyncRules } from '../rule/rule.js'

export const createAsyncValidator: YobtaAsyncValidatorFactory =
  <R extends SyncOrAsyncRules>(...rules: R) =>
  async (
    event: unknown,
    context?: YobtaContext,
  ): YobtaAsyncValidatorResult<PipeFactoryResult<R>> => {
    const ctx = context || createContext(event)

    let result = event as PipeFactoryResult<R>

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

    return (ctx.errors.length ? [null, ctx.errors] : [result, null]) as Awaited<
      YobtaAsyncValidatorResult<PipeFactoryResult<R>>
    >
  }
