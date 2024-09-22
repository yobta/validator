import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const numberMessage = 'It should be a number'

export const number = <I>(
  message = numberMessage,
): YobtaSyncRule<I, YobtaMaybe<I, number>> =>
  rule((value: I = '' as I) => {
    if (value === '') {
      return undefined as YobtaMaybe<I, number>
    }

    try {
      const n = Number(value)
      if (Number.isFinite(n)) {
        return n as YobtaMaybe<I, number>
      }
    } catch {}

    throw new Error(message)
  })
