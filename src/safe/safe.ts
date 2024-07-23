import type { YobtaSafe } from '../_types/YobtaSafe.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const safe: YobtaSafe = (
  fallbackValue: any,
  ...rules: YobtaSyncRule<any, any>[]
) => {
  return ruleYobta((input, context) => {
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