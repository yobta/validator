import type { YobtaAsyncPipeFactory } from '../_types/YobtaAsyncPipeFactory.js'
import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { SyncOrAsyncRules } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const asyncPipe: YobtaAsyncPipeFactory = <
  Rules extends SyncOrAsyncRules,
>(
  ...rules: Rules
) =>
  ruleYobta<unknown, Promise<PipeFactoryResult<Rules>>>(
    async (input, context) => {
      for await (const rule of rules) {
        input = await rule(context)(input)
      }
      return input as PipeFactoryResult<Rules>
    },
  )
