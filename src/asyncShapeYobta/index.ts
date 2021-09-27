import { shapeMessage } from '..'
import {
  createRule,
  SyncRule,
  AnySyncOrAsyncRule,
  SyncOrAsyncRules
} from '../createRule'
import { isPlainObject } from '../_internal/isPlainObject'
import { parseUnknownError } from '../_internal/parseUnknownError'
import { PipeFactoryResult, PipedFactories } from '../_internal/pipe'
import { asyncPipe } from '../_internal/asyncPipe'
import { YobtaError } from '../_internal/YobtaError'

type Rules = Record<PropertyKey, SyncOrAsyncRules>

type Result<F extends Rules> = {
  [Property in keyof F]: PipeFactoryResult<F[Property]>
}

type Config<F extends Rules> = {
  [K in keyof F]: PipedFactories<F[K]>
}

interface AsyncShapeRule {
  <F extends Rules>(rulesSet: Config<F>, message?: string): SyncRule<
    any,
    Promise<Result<F> | undefined>
  >
}

export const asyncShapeMessage = 'It should be a plain object'

export const asyncShapeYobta: AsyncShapeRule = (
  rulesSet,
  validationMessage = shapeMessage
) =>
  createRule(async (input, context) => {
    if (typeof input === 'undefined') {
      return input
    }
    if (!isPlainObject(input)) {
      throw new Error(validationMessage)
    }

    let result = await Object.entries(rulesSet).reduce(
      async (acc, [field, rules]) => {
        let path = [...context.path, field]
        let tests = rules.map((rule: AnySyncOrAsyncRule) =>
          rule({
            ...context,
            field,
            path
          })
        )
        let next = input[field]
        try {
          next = await asyncPipe(...tests)(next)
        } catch (error) {
          let { message } = parseUnknownError(error)
          context.pushError(new YobtaError({ message, field, path }))
        }
        return { ...acc, [field]: next }
      },
      input
    )

    return result
  })
