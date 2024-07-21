import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type {
  YobtaAnySyncRule,
  YobtaSyncRule,
  YobtaSyncRules,
} from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type SyncRulesRecord = Record<PropertyKey, YobtaSyncRules>

type ShapeConfigYobta<Branch extends SyncRulesRecord> = {
  [Rules in keyof Branch]: SyncRulesPipeYobta<Branch[Rules]>
}

type ValidShapeYobta<Branch extends SyncRulesRecord> = {
  [Rules in keyof Branch]: PipeFactoryResult<Branch[Rules]>
}

export const shapeMessage = 'It should be a plain object'

export const shapeYobta = <I, F extends SyncRulesRecord>(
  rulesMap: ShapeConfigYobta<F>,
  validationMessage = shapeMessage,
): YobtaSyncRule<I, YobtaPretty<ValidShapeYobta<F>>> =>
  ruleYobta<I, ValidShapeYobta<F>>((value = {} as I, context) => {
    if (!isPlainObject(value)) {
      throw new Error(validationMessage)
    }

    const result = { ...value } as ValidShapeYobta<F>

    for (const field of Object.keys(rulesMap)) {
      const path = [...context.path, field]
      const tests = rulesMap[field].map((rule: YobtaAnySyncRule) =>
        rule({
          ...context,
          data: value,
          field,
          path,
        }),
      ) as Functions
      let next = value[field as keyof typeof value]
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
