import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { YobtaPipeFactory } from '../_types/YobtaPipeFactory.js'
import type { YobtaSyncRule, YobtaSyncRules } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const pipe: YobtaPipeFactory = <Rules extends YobtaSyncRules>(
  ...rules: Rules
): YobtaSyncRule<unknown, PipeFactoryResult<Rules>> =>
  rule((input, context) => {
    for (const test of rules) {
      input = test(context)(input)
    }
    return input as any
  })
