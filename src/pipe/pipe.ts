import type { PipeFactoryResult } from '../_types/YobtaPipe.js'
import type { YobtaPipeFactory } from '../_types/YobtaPipeFactory.js'
import type { YobtaSyncRule, YobtaSyncRules } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const pipe: YobtaPipeFactory = <Rules extends YobtaSyncRules>(
  ...rules: Rules
): YobtaSyncRule<unknown, PipeFactoryResult<Rules>> =>
  ruleYobta((input, context) => {
    for (const rule of rules) {
      input = rule(context)(input)
    }
    return input as any
  })
