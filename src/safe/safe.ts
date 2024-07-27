import type { YobtaSafe } from '../_types/YobtaSafe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const safe: YobtaSafe = (
  fallbackValue: any,
  ...rules: YobtaSyncRule<any, any>[]
) => {
  return rule((input, context) => {
    try {
      for (const test of rules) {
        input = test(context)(input)
      }
      return input
    } catch (error) {
      return fallbackValue
    }
  })
}
