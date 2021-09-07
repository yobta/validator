import { createRule, SyncRule, AnySyncRule, SyncRules } from '../createRule'
import { isPlainObject } from '../isPlainObject'
import { pipe, PipeFactoryResult, PipedFactories } from '../pipe'
import { YobtaError } from '../YobtaError'

type Result<F extends Record<string, SyncRules>> = {
  [Property in keyof F]: PipeFactoryResult<F[Property]>
}

type Config<F extends Record<string, SyncRules>> = {
  [K in keyof F]: PipedFactories<F[K]>
}

export const shapeMessage = 'It should be a plain object'

export const shapeYobta = <F extends Record<string, SyncRules>>(
  rulesSet: Config<F>,
  message = shapeMessage
): SyncRule<any, Result<F> | undefined> =>
  createRule((input, context) => {
    if (!isPlainObject(input) && typeof input !== 'undefined') {
      throw new Error(message)
    }

    return (input &&
      Object.entries(rulesSet).reduce((acc, [field, rules]) => {
        let path = [...context.path, field]
        let tests = rules.map((rule: AnySyncRule) =>
          rule({
            ...context,
            field,
            path
          })
        )
        // @ts-ignore
        let next = input[field]
        try {
          next = pipe(...tests)(next)
        } catch (error) {
          context.pushError(
            new YobtaError({ message: error.message, field, path })
          )
        }
        return { ...acc, [field]: next }
      }, {})) as Result<F>
  })
