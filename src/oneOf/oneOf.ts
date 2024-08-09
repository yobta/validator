import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export type OneOfMessage<T> = (items: Set<T>) => string

export const oneOfMessage: OneOfMessage<unknown> = items =>
  `It should be one of: ${items}`

export const oneOf = <I, T>(
  items: () => Set<T>,
  message: OneOfMessage<T> = oneOfMessage,
): YobtaSyncRule<any, YobtaMaybe<I, T>> =>
  rule((input: T) => {
    if (items().has(input) || input === undefined) {
      return input as YobtaMaybe<I, T>
    }
    throw new Error(message(items()))
  })
