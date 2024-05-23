import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  PipedFactories,
  PipeFactoryResult} from '../_internal/pipe/index.js';
import {
  pipe
} from '../_internal/pipe/index.js'
import type {
  AnySyncRule,
  SyncRule,
  SyncRules} from '../ruleYobta/index.js';
import {
  ruleYobta
} from '../ruleYobta/index.js'

type SyncRulesRecord = Record<PropertyKey, SyncRules>

type Config<F extends SyncRulesRecord> = {
  [K in keyof F]: PipedFactories<F[K]>
}

type Result<F extends SyncRulesRecord> = {
  [Property in keyof F]: PipeFactoryResult<F[Property]>
}

export const shapeMessage = 'It should be a plain object'

export const shapeYobta = <F extends SyncRulesRecord>(
  rulesMap: Config<F>,
  validationMessage = shapeMessage,
): SyncRule<any, Result<F> | undefined> =>
  ruleYobta((data, context) => {
    if (!isPlainObject(data) && typeof data !== 'undefined') {
      throw new Error(validationMessage)
    }

    return (data &&
      Object.entries(rulesMap).reduce((acc, [field, rules]) => {
        const path = [...context.path, field]
        const tests = rules.map((rule: AnySyncRule) =>
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
          const yobtaError = handleUnknownError({ error, field, path })
          context.pushError(yobtaError)
        }
        return { ...acc, [field]: next }
      }, data)) as Result<F>
  })
