import type { YobtaAsyncPipeFactory } from '../_types/YobtaAsyncPipeFactory.js'
import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { SyncOrAsyncRules } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const asyncPipe: YobtaAsyncPipeFactory = <
  Rules extends SyncOrAsyncRules,
>(
  ...rules: Rules
) =>
  rule<unknown, Promise<PipeFactoryResult<Rules>>>(async (input, context) => {
    for await (const test of rules) {
      input = await test(context)(input)
    }
    return input as PipeFactoryResult<Rules>
  })
