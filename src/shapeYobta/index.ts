import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type { SyncValidatorYobta } from '../_types/YobtaSyncValidator.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type SyncRulesRecord = Record<PropertyKey, SyncValidatorYobta<any, any>>

type ShapeConfigYobta<Branch extends SyncRulesRecord> = {
  [Rules in keyof Branch]: Branch[Rules]
}

type ValidShapeYobta<Branch extends SyncRulesRecord> = {
  [Rules in keyof Branch]: ReturnType<Branch[Rules]>
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

    for (const field in rulesMap) {
      // @ts-ignore
      let data = value[field]
      const path = [...context.path, field]
      const validate = rulesMap[field]

      try {
        data = validate(data, { ...context, data: value, field, path })
      } catch (error) {
        const yobtaError = handleUnknownError({ error, field, path })
        context.pushError(yobtaError)
      }
      result[field] = data
    }

    return result
  })
