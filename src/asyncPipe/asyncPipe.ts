import type { YobtaAsyncPipeFactory } from '../_types/YobtaAsyncPipeFactory.js'
import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { SyncOrAsyncRules } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const asyncPipe: YobtaAsyncPipeFactory = <
  Rules extends SyncOrAsyncRules,
>(
  ...rules: Rules
) =>
  createRule<unknown, Promise<PipeFactoryResult<Rules>>>(
    async (input, context) => {
      for await (const rule of rules) {
        input = await rule(context)(input)
      }
      return input as PipeFactoryResult<Rules>
    },
  )
