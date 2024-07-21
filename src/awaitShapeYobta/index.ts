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
  SyncOrAsyncRules,
  YobtaSyncRule,
} from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type GenericMapShapeConfig = Record<PropertyKey, SyncOrAsyncRules>

type AwaitShapeConfig<Config extends GenericMapShapeConfig> = {
  [K in keyof Config]: SyncRulesPipeYobta<Config[K]>
}

type ValidAsyncShapeYobta<F extends GenericMapShapeConfig> = {
  [Key in keyof F]: PipeFactoryResult<F[Key]>
}

export const asyncShapeMessage = 'It should be a plain object'

export const awaitShapeYobta = <
  I,
  F extends GenericMapShapeConfig = GenericMapShapeConfig,
>(
  rulesSet: AwaitShapeConfig<F>,
  validationMessage: string = shapeMessage,
): YobtaSyncRule<I, Promise<ValidAsyncShapeYobta<F>>> =>
  ruleYobta<I, Promise<ValidAsyncShapeYobta<F>>>(async (data, context) => {
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
  })
