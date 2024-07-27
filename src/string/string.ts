import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

interface StringFactory {
  (message?: string): YobtaSyncRule<unknown, string>
}

const coercedTypes = new Set(['number', 'boolean', 'string'])

export const stringMessage = 'It should be a string'

export const string: StringFactory = (message = stringMessage) =>
  rule<unknown, string>((value = '') => {
    if (value instanceof String || coercedTypes.has(typeof value)) {
      return String(value).trim()
    }

    throw new Error(message)
  })
