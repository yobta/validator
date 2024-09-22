import type { YobtaFallback } from '../_types/YobtaFallback.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

const empty = new Set<unknown>(['', undefined])

export const fallback: YobtaFallback = (
  fallbackValue: any,
  ...rules: YobtaSyncRule<any, any>[]
) => {
  return rule((input, context) => {
    if (!rules.length) {
      if (empty.has(input)) {
        return fallbackValue
      }
      return input
    }
    try {
      for (const test of rules) {
        input = test(context)(input)
      }
      return input
    } catch {
      return fallbackValue
    }
  })
}
