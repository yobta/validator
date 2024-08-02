import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const integerMessage = 'It should be an integer'

type Integer = { __brand: 'integer' } & number

export const integer = <I extends number | undefined>(
  message = integerMessage,
): YobtaSyncRule<I, YobtaMaybe<I, Integer>> =>
  rule((input: I) => {
    if (input === undefined || Number.isInteger(input)) {
      return input as Integer
    }

    throw new Error(message)
  })
