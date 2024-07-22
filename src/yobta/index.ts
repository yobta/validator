import { createContext } from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { Functions } from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaFactory } from '../_types/YobtaFactory.js'
import type { YobtaSyncRules } from '../ruleYobta/index.js'
import type { YobtaError } from '../YobtaError/index.js'

export const yobta: YobtaFactory =
  <R extends YobtaSyncRules>(...rules: R) =>
  (data: unknown, context?: YobtaContext) => {
    const ctx = context || {
      ...createContext(data),
      pushError(error: YobtaError) {
        throw error
      },
    }

    const validators = rules.map(next => next(ctx)) as Functions

    try {
      return pipe(...validators)(data)
    } catch (error) {
      throw handleUnknownError({
        error,
        field: ctx.field,
        path: ctx.path,
      })
    }
  }
