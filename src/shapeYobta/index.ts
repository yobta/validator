import { createRule, SyncRule } from '../createRule'
import { isPlainObject } from '../isPlainObject'
import {
  pipe,
  PipeFactoryResult,
  Factories,
  PipedFactories,
  Factory
} from '../pipe'

type Result<R extends Record<string, Factories>> = {
  [Property in keyof R]: PipeFactoryResult<R[Property]>
}

type Config<R extends Record<string, Factories>> = {
  [K in keyof R]: PipedFactories<R[K]>
}

export const shapeMessage = 'Should be a plain object'

export const shapeYobta = <R extends Record<string, Factories>>(
  rulesSet: Config<R>,
  message = shapeMessage
): SyncRule<any, Result<R> | undefined> =>
  createRule((input, context) => {
    if (!isPlainObject(input) && typeof input !== 'undefined') {
      throw new Error(message)
    }

    return (input &&
      Object.entries(rulesSet).reduce((acc, [field, rules]) => {
        let path = [...context.path, field]
        let tests = rules.map((rule: Factory) =>
          rule({
            ...context,
            field,
            path
          })
        )
        // @ts-ignore
        let prev = input[field]
        let next
        try {
          next = pipe(...tests)(prev)
        } catch (error) {
          context.pushError({ message: error.message, field, path })
          next = error
        }
        return { ...acc, [field]: next }
      }, {})) as Result<R>
  })
