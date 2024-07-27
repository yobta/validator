import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export type OneOfMessage<T> = (items: Set<T>) => string

export const oneOfMessage: OneOfMessage<unknown> = items =>
  `It should be one of: ${items}`

export const oneOf = <T>(
  items: () => Set<T>,
  message: OneOfMessage<T> = oneOfMessage,
): YobtaSyncRule<any, T> =>
  createRule((input: T) => {
    const s = items()
    if (s.has(input)) {
      return input
    }
    throw new Error(message(s))
  })
