import { asyncPipe } from '../_internal/asyncPipe/index.js'
import { createContext } from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { Functions, PipeFactoryResult } from '../_internal/pipe/index.js'
import type { AsyncFactoryYobta } from '../_types/AsyncFactoryYobta.js'
import type { YobtaAsyncFailure } from '../_types/YobtaAsyncFailure.js'
import type { YobtaAsyncSuccess } from '../_types/YobtaAsyncSuccess.js'
import type { SyncOrAsyncRules } from '../ruleYobta/index.js'

const field = '@'

export const asyncYobta: AsyncFactoryYobta =
  <R extends SyncOrAsyncRules>(...rules: R) =>
  async (data: any) => {
    const context = createContext(data)

    const validators = rules.map(next => next(context)) as Functions

    try {
      const result: PipeFactoryResult<R> = await asyncPipe(...validators)(data)
      if (context.errors.length) {
        return [null, context.errors] as YobtaAsyncFailure
      }
      return [result, null] as YobtaAsyncSuccess<PipeFactoryResult<R>>
    } catch (error) {
      const yobtaError = handleUnknownError({ error, field, path: [] })
      context.pushError(yobtaError)
      return [null, context.errors] as YobtaAsyncFailure
    }
  }
