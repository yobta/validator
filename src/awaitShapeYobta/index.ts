import { asyncPipe } from '../_internal/asyncPipe/index.js'
import { isPlainObject } from '../_internal/isPlainObject/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type {
  Functions,
  PipeFactoryResult,
  SyncRulesPipeYobta,
} from '../_internal/pipe/index.js'
import type { YobtaOptionalIfUnkown } from '../_types/YobtaOptionalIfUnkown.js'
import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { shapeMessage } from '../index.js'
import type {
  AnySyncOrAsyncRule,
  SyncOrAsyncRules,
} from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type GenericMapShapeConfig = Record<PropertyKey, SyncOrAsyncRules>

type AwaitShapeConfig<Config extends GenericMapShapeConfig> = {
  [K in keyof Config]: SyncRulesPipeYobta<Config[K]>
}

type ValidAsyncShapeYobta<F extends GenericMapShapeConfig> = {
  [Key in keyof F]: PipeFactoryResult<F[Key]>
}

type OptionalValidAsyncShapeYobta<
  I,
  F extends GenericMapShapeConfig,
> = YobtaOptionalIfUnkown<I, ValidAsyncShapeYobta<F>>

export const asyncShapeMessage = 'It should be a plain object'

export const awaitShapeYobta = <
  I,
  F extends GenericMapShapeConfig = GenericMapShapeConfig,
>(
  rulesSet: AwaitShapeConfig<F>,
  validationMessage: string = shapeMessage,
): YobtaOptionalSyncRule<I, Promise<OptionalValidAsyncShapeYobta<I, F>>> =>
  ruleYobta<I, Promise<OptionalValidAsyncShapeYobta<I, F>>>(
    async (data, context) => {
      if (data === undefined) {
        return undefined
      }

      if (!isPlainObject(data)) {
        throw new Error(validationMessage)
      }

      const result = { ...data } as ValidAsyncShapeYobta<F>

      for await (const field of Object.keys(rulesSet)) {
        const path = [...context.path, field]
        const validators = rulesSet[field].map((rule: AnySyncOrAsyncRule) =>
          rule({ ...context, data, field, path }),
        ) as Functions
        try {
          const valid = await asyncPipe(...validators)(data[field as keyof I])
          result[field as keyof I] = valid
        } catch (error) {
          const yobtaError = handleUnknownError({ error, field, path })
          context.pushError(yobtaError)
        }
      }

      return result
    },
  )
