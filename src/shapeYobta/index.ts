import { ruleYobta, SyncRule, AnySyncRule, SyncRules } from '../ruleYobta'
import { isPlainObject } from '../_internal/isPlainObject'
import { handleUnknownError } from '../_internal/parseUnknownError'
import { pipe, PipeFactoryResult, PipedFactories } from '../_internal/pipe'

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
  validationMessage = shapeMessage,
): SyncRule<any, Result<F> | undefined> =>
  ruleYobta((data, context) => {
    if (!isPlainObject(data) && typeof data !== 'undefined') {
      throw new Error(validationMessage)
    }

    return (data &&
      Object.entries(rulesSet).reduce((acc, [field, rules]) => {
        let path = [...context.path, field]
        let tests = rules.map((rule: AnySyncRule) =>
          rule({
            ...context,
            data,
            field,
            path,
          }),
        )
        let next = data[field]
        try {
          next = pipe(...tests)(next)
        } catch (error) {
          let yobtaError = handleUnknownError({ error, field, path })
          context.pushError(yobtaError)
        }
        return { ...acc, [field]: next }
      }, data)) as Result<F>
  })
