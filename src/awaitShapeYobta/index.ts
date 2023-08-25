import { asyncPipe } from '../_internal/asyncPipe/index.js'
import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  PipedFactories,
  PipeFactoryResult,
} from '../_internal/pipe/index.js'
import { shapeMessage } from '../index.js'
import type {
  AnySyncOrAsyncRule,
  SyncOrAsyncRules,
  SyncRule,
} from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type Rules = Record<PropertyKey, SyncOrAsyncRules>

type Result<F extends Rules> = {
  [Property in keyof F]: PipeFactoryResult<F[Property]>
}

type Config<F extends Rules> = {
  [K in keyof F]: PipedFactories<F[K]>
}

interface AwaitShapeFactory {
  <F extends Rules>(
    rulesSet: Config<F>,
    message?: string,
  ): SyncRule<any, Promise<Result<F> | undefined>>
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
        acc = await acc
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
      Promise.resolve(data),
    )

    return result
  })
