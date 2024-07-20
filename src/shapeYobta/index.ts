import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipedFunctions,
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type {
  AnySyncRule,
  OptionalIfUnkown,
  OptionalSyncRule,
  SyncRules,
} from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type SyncRulesRecord = Record<PropertyKey, SyncRules>

type ShapeConfigYobta<F extends SyncRulesRecord> = {
  [K in keyof F]: SyncRulesPipeYobta<F[K]>
}

type ValidShapeYobta<F extends SyncRulesRecord> = {
  [Property in keyof F]: PipeFactoryResult<F[Property]>
}

type OptionalValidShapeYobta<I, F extends SyncRulesRecord> = OptionalIfUnkown<
  I,
  ValidShapeYobta<F>
>

export const shapeMessage = 'It should be a plain object'

export const shapeYobta = <I, F extends SyncRulesRecord>(
  rulesMap: ShapeConfigYobta<F>,
  validationMessage = shapeMessage,
): OptionalSyncRule<I, ValidShapeYobta<F>> =>
  ruleYobta<I, OptionalValidShapeYobta<I, F>>((data, context) => {
    if (data === undefined) {
      return undefined
    }

    if (!isPlainObject(data)) {
      throw new Error(validationMessage)
    }

    const result = { ...data } as ValidShapeYobta<F>

    for (const field of Object.keys(rulesMap)) {
      const path = [...context.path, field]
      const tests = rulesMap[field].map((rule: AnySyncRule) =>
        rule({
          ...context,
          data,
          field,
          path,
        }),
      ) as PipedFunctions<Functions>
      let next = data[field as keyof typeof data]
      try {
        next = pipe(...tests)(next)
      } catch (error) {
        const yobtaError = handleUnknownError({ error, field, path })
        context.pushError(yobtaError)
      }
      // @ts-ignore
      result[field] = next
    }

    return result
  })
