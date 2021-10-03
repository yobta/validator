import { shapeMessage } from '..'
import {
  ruleYobta,
  SyncRule,
  AnySyncOrAsyncRule,
  SyncOrAsyncRules,
} from '../ruleYobta'
import { isPlainObject } from '../_internal/isPlainObject'
import { handleUnknownError } from '../_internal/parseUnknownError'
import { PipeFactoryResult, PipedFactories } from '../_internal/pipe'
import { asyncPipe } from '../_internal/asyncPipe'

type Rules = Record<PropertyKey, SyncOrAsyncRules>

type Result<F extends Rules> = {
  [Property in keyof F]: PipeFactoryResult<F[Property]>
}

type Config<F extends Rules> = {
  [K in keyof F]: PipedFactories<F[K]>
}

interface AwaitShapeFactory {
  <F extends Rules>(rulesSet: Config<F>, message?: string): SyncRule<
    any,
    Promise<Result<F> | undefined>
  >
}

export const asyncShapeMessage = 'It should be a plain object'

export const awaitShapeYobta: AwaitShapeFactory = (
  rulesSet,
  validationMessage = shapeMessage,
) =>
  ruleYobta(async (data, context) => {
    if (typeof data === 'undefined') {
      return data
    }
    if (!isPlainObject(data)) {
      throw new Error(validationMessage)
    }

    let result = await Object.entries(rulesSet).reduce(
      async (acc, [field, rules]) => {
        let path = [...context.path, field]
        let tests = rules.map((rule: AnySyncOrAsyncRule) =>
          rule({
            ...context,
            data,
            field,
            path,
          }),
        )
        let next = data[field]
        try {
          next = await asyncPipe(...tests)(next)
        } catch (error) {
          let yobtaError = handleUnknownError({ error, field, path })
          context.pushError(yobtaError)
        }
        return { ...acc, [field]: next }
      },
      data,
    )

    return result
  })
