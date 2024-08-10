import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type { YobtaAnySyncRule, YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

type SyncRulesRecord = Record<PropertyKey, YobtaAnySyncRule>

type ShapeConfigYobta<Record extends SyncRulesRecord> = {
  [Validator in keyof Record]: Record[Validator]
}

type ValidShapeYobta<Record extends SyncRulesRecord> = {
  [Validator in keyof Record]: ReturnType<ReturnType<Record[Validator]>>
}

export const shapeMessage = 'Ivalid shape'

export const shape = <I, F extends SyncRulesRecord>(
  rulesMap: ShapeConfigYobta<F>,
  validationMessage = shapeMessage,
): YobtaSyncRule<I, YobtaMaybe<I, YobtaPretty<ValidShapeYobta<F>>>> =>
  rule((value: I = '' as I, context) => {
    if (value === '') {
      return undefined as YobtaMaybe<I, YobtaPretty<ValidShapeYobta<F>>>
    }

    const err = new Error(validationMessage)

    if (!isPlainObject(value)) {
      throw err
    }

    const result = { ...value } as ValidShapeYobta<F>

    for (const field in rulesMap) {
      const path = [...context.path, field]
      const validate = rulesMap[field]

      try {
        // @ts-ignore
        const next = value[field]
        result[field] = validate({
          ...context,
          data: value,
          field,
          path,
          value: next,
        })(next)
      } catch (error) {
        context.pushError(handleUnknownError({ error, field, path }))
      }
    }

    if (context.errors.length) {
      throw err
    }

    return result as YobtaMaybe<I, YobtaPretty<ValidShapeYobta<F>>>
  })
