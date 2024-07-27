import type { YobtaSafe } from '../_types/YobtaSafe.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const safe: YobtaSafe = (
  fallbackValue: any,
  ...rules: YobtaSyncRule<any, any>[]
) => {
  return createRule((input, context) => {
    try {
      for (const rule of rules) {
        input = rule(context)(input)
      }
      return input
    } catch (error) {
      return fallbackValue
    }
  })
}
