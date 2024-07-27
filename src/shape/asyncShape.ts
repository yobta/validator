import { isPlainObject } from '../_internal/isPlainObject/index.js'
import type { YobtaAsyncValidator } from '../_types/YobtaAsyncValidator.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'
import type { YobtaError } from '../index.js'

type AsyncRulesRecord = Record<PropertyKey, YobtaAsyncValidator<any, any>>

type AwaitShapeConfig<Record extends AsyncRulesRecord> = {
  [Validator in keyof Record]: Record[Validator]
}

type ValidAsyncShapeYobta<Record extends AsyncRulesRecord> = {
  [Validator in keyof Record]: Awaited<Record[Validator]>
}

export const asyncShapeMessage = 'Invalid shape'

export const asyncShape = <I, Record extends AsyncRulesRecord>(
  rulesSet: AwaitShapeConfig<Record>,
  validationMessage: string = asyncShapeMessage,
): YobtaSyncRule<I, Promise<ValidAsyncShapeYobta<Record>>> =>
  createRule<I, Promise<ValidAsyncShapeYobta<Record>>>(
    async (value, context) => {
      if (!isPlainObject(value)) {
        throw new Error(validationMessage)
      }

      const result = { ...value } as ValidAsyncShapeYobta<Record>
      const errors: YobtaError[] = []

      for await (const field of Object.keys(rulesSet)) {
        const path = [...context.path, field]
        const validate = rulesSet[field]
        const [valid, errs] = await validate(value[field as keyof I], {
          ...context,
          data: value,
          field,
          path,
        })

        if (errs) {
          errors.push(...errs)
        }

        // @ts-ignore
        result[field] = valid
      }

      if (errors.length) {
        throw new Error(validationMessage)
      }

      return result
    },
  )
