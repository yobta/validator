import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const test = <I extends string | undefined>(
  re: RegExp,
  message: string,
): YobtaSyncRule<I, YobtaMaybe<I, string>> =>
  rule((value: I) => {
    if (value === undefined || re.test(value)) {
      return value as unknown as YobtaMaybe<I, string>
    }
    throw new Error(message)
  })
