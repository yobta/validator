import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type { YobtaOptionalIfUnkown } from '../_types/YobtaOptionalIfUnkown.js'
import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type { YobtaAnySyncRule, YobtaSyncRules } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type SyncRulesRecord = Record<PropertyKey, YobtaSyncRules>

type ShapeConfigYobta<Branch extends SyncRulesRecord> = {
  [Rules in keyof Branch]: SyncRulesPipeYobta<Branch[Rules]>
}

type ValidShapeYobta<Branch extends SyncRulesRecord> = {
  [Rules in keyof Branch]: PipeFactoryResult<Branch[Rules]>
}

type OptionalValidShapeYobta<
  I,
  F extends SyncRulesRecord,
> = YobtaOptionalIfUnkown<I, ValidShapeYobta<F>>

export const shapeMessage = 'It should be a plain object'

export const shapeYobta = <I, F extends SyncRulesRecord>(
  rulesMap: ShapeConfigYobta<F>,
  validationMessage = shapeMessage,
): YobtaOptionalSyncRule<I, YobtaPretty<ValidShapeYobta<F>>> =>
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
      const tests = rulesMap[field].map((rule: YobtaAnySyncRule) =>
        rule({
          ...context,
          data,
          field,
          path,
        }),
      ) as Functions
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
