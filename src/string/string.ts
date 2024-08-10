import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

const coercedTypes = new Set(['number', 'boolean', 'string'])

export const stringMessage = 'It should be a string'

export const string = <I>(
  message = stringMessage,
): YobtaSyncRule<I, YobtaMaybe<I, string>> =>
  rule((value: I = '' as I) => {
    if (value === '') {
      return undefined as YobtaMaybe<I, string>
    }

    if (value instanceof String || coercedTypes.has(typeof value)) {
      return String(value).trim() as YobtaMaybe<I, string>
    }

    throw new Error(message)
  })
