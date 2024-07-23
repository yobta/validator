import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { SyncValidatorYobta } from '../_types/SyncValidatorYobta.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type SyncRulesRecord = Record<PropertyKey, SyncValidatorYobta<any, any>>

type ShapeConfigYobta<Record extends SyncRulesRecord> = {
  [Validator in keyof Record]: Record[Validator]
}

type ValidShapeYobta<Record extends SyncRulesRecord> = {
  [Validator in keyof Record]: ReturnType<Record[Validator]>
}

export const shapeMessage = 'Ivalid shape'

export const shapeYobta = <I, F extends SyncRulesRecord>(
  rulesMap: ShapeConfigYobta<F>,
  validationMessage = shapeMessage,
): YobtaSyncRule<I, YobtaPretty<ValidShapeYobta<F>>> =>
  ruleYobta<I, ValidShapeYobta<F>>((value = {} as I, context) => {
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
        result[field] = validate(value[field], {
          ...context,
          data: value,
          field,
          path,
        })
      } catch (error) {
        context.pushError(handleUnknownError({ error, field, path }))
      }
    }

    if (context.errors.length) {
      throw err
    }

    return result
  })
