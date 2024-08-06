import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const dateMessage = 'It should be a date'

export const date = <I>(
  message = dateMessage,
): YobtaSyncRule<I, YobtaMaybe<I, Date>> =>
  rule(input => {
    if (!input) {
      return undefined as YobtaMaybe<I, Date>
    }

    const value = new Date(input as string)

    if (!Number(value)) {
      throw new Error(message)
    }

    return value
  })
