import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type {
  YobtaAnySyncRule,
  YobtaSyncRule,
} from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

type SyncRulesRecord = Record<PropertyKey, YobtaAnySyncRule>

type ShapeConfigYobta<Record extends SyncRulesRecord> = {
  [Validator in keyof Record]: Record[Validator]
}

type ValidShapeYobta<Record extends SyncRulesRecord> = {
  [Validator in keyof Record]: ReturnType<Record[Validator]>
}

export const shapeMessage = 'Ivalid shape'

export const shape = <I, F extends SyncRulesRecord>(
  rulesMap: ShapeConfigYobta<F>,
  validationMessage = shapeMessage,
): YobtaSyncRule<I, YobtaPretty<ValidShapeYobta<F>>> =>
  createRule<I, ValidShapeYobta<F>>((value = {} as I, context) => {
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
        result[field] = validate({
          ...context,
          data: value,
          field,
          path,
          // @ts-ignore
        })(value[field])
      } catch (error) {
        context.pushError(handleUnknownError({ error, field, path }))
      }
    }

    if (context.errors.length) {
      throw err
    }

    return result
  })
