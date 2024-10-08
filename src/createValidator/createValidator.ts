import { createContext } from '../_internal/createContext/createContext.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaContext } from '../_types/YobtaContext.js'
import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { YobtaValidatorFactory } from '../_types/YobtaValidatorFactory.js'
import type { YobtaSyncRules } from '../rule/rule.js'
import type { YobtaError } from '../YobtaError/index.js'

export const createValidator: YobtaValidatorFactory =
  <Rules extends YobtaSyncRules>(...rules: Rules) =>
  (event: unknown, context?: YobtaContext) => {
    const ctx = context || {
      ...createContext(event),
      pushError(error: YobtaError) {
        throw error
      },
    }
    try {
      for (const rule of rules) {
        event = rule(ctx)(event)
      }
      return event as PipeFactoryResult<Rules>
    } catch (error) {
      throw handleUnknownError({
        error,
        field: ctx.field,
        path: ctx.path,
      })
    }
  }
