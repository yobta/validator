import { asyncPipe } from '../_internal/asyncPipe/index.js'
import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import { shapeMessage } from '../index.js'
import type {
  AnySyncOrAsyncRule,
  OptionalIfUnkown,
  OptionalSyncRule,
  SyncOrAsyncRules,
} from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type GenericMapShapeConfig = Record<PropertyKey, SyncOrAsyncRules>

type AwaitShapeConfig<Config extends GenericMapShapeConfig> = {
  [K in keyof Config]: SyncRulesPipeYobta<Config[K]>
}

type ValidResults<F extends GenericMapShapeConfig> = {
  [Key in keyof F]: PipeFactoryResult<F[Key]>
}

type MapShapeValidationResults<
  I,
  F extends GenericMapShapeConfig,
> = OptionalIfUnkown<I, ValidResults<F>>

export const asyncShapeMessage = 'It should be a plain object'

export const awaitShapeYobta = <
  I,
  F extends GenericMapShapeConfig = GenericMapShapeConfig,
>(
  rulesSet: AwaitShapeConfig<F>,
  validationMessage: string = shapeMessage,
): OptionalSyncRule<I, Promise<MapShapeValidationResults<I, F>>> =>
  ruleYobta<I, Promise<MapShapeValidationResults<I, F>>>(
    async (data, context) => {
      if (data === undefined) {
        return undefined
      }

      if (!isPlainObject(data)) {
        throw new Error(validationMessage)
      }

      const result = { ...data } as ValidResults<F>

      for await (const field of Object.keys(rulesSet)) {
        const path = [...context.path, field]
        const validators = rulesSet[field].map((rule: AnySyncOrAsyncRule) =>
          rule({ ...context, data, field, path }),
        )
        try {
          const valid = await asyncPipe(...(validators as Functions))(
            data[field as keyof I],
          )
          result[field as keyof I] = valid
        } catch (error) {
          const yobtaError = handleUnknownError({ error, field, path })
          context.pushError(yobtaError)
        }
      }

      return result
    },
  )
