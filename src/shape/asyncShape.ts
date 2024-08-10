import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaAsyncRule } from '../_types/YobtaAsyncRule.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { SyncOrAsyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

type AsyncRulesRecord = Record<PropertyKey, SyncOrAsyncRule<any, any>>

type AwaitShapeConfig<Record extends AsyncRulesRecord> = {
  [Rule in keyof Record]: Record[Rule]
}

type ValidAsyncShapeYobta<I, Record extends AsyncRulesRecord> = YobtaMaybe<
  I,
  {
    [Rule in keyof Record]: Awaited<ReturnType<ReturnType<Record[Rule]>>>
  }
>

export const asyncShapeMessage = 'Invalid shape'

export const asyncShape = <I, Record extends AsyncRulesRecord>(
  rulesSet: AwaitShapeConfig<Record>,
  validationMessage: string = asyncShapeMessage,
): YobtaAsyncRule<I, ValidAsyncShapeYobta<I, Record>> =>
  rule<I, Promise<ValidAsyncShapeYobta<I, Record>>>(
    async (value: I = '' as I, context) => {
      if (value === '') {
        return undefined as ValidAsyncShapeYobta<I, Record>
      }

      if (!isPlainObject(value)) {
        throw new Error(validationMessage)
      }

      const result = { ...value } as ValidAsyncShapeYobta<I, Record>
      let isInvalid = false

      for await (const field of Object.keys(rulesSet)) {
        const path = [...context.path, field]
        const validate = rulesSet[field]
        const next = value[field as keyof I]

        try {
          const valid = await validate({
            ...context,
            data: value,
            field,
            path,
            value: next,
          })(next)
          // @ts-ignore
          result[field] = valid
        } catch (error) {
          isInvalid = true
          context.pushError(handleUnknownError({ error, field, path }))
        }
      }

      if (isInvalid) {
        throw new Error(validationMessage)
      }

      return result
    },
  )
