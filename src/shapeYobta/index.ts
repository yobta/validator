import { createRule, SyncRule, AnySyncRule, SyncRules } from '../createRule'
import { isPlainObject } from '../_internal/isPlainObject'
import { parseUnknownError } from '../_internal/parseUnknownError'
import { pipe, PipeFactoryResult, PipedFactories } from '../_internal/pipe'
import { YobtaError } from '../_internal/YobtaError'

type Rules = Record<PropertyKey, SyncRules>

type Result<F extends Rules> = {
  [Property in keyof F]: PipeFactoryResult<F[Property]>
}

type Config<F extends Rules> = {
  [K in keyof F]: PipedFactories<F[K]>
}

export const shapeMessage = 'It should be a plain object'

export const shapeYobta = <F extends Rules>(
  rulesSet: Config<F>,
  validationMessage = shapeMessage
): SyncRule<any, Result<F> | undefined> =>
  createRule((input, context) => {
    if (!isPlainObject(input) && typeof input !== 'undefined') {
      throw new Error(validationMessage)
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
          let { message } = parseUnknownError(error)
          context.pushError(new YobtaError({ message, field, path }))
        }
        return { ...acc, [field]: next }
      }, input)) as Result<F>
  })
