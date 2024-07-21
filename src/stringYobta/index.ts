import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface StringFactory {
  (message?: string): YobtaSyncRule<unknown, string>
}

const coercedTypes = new Set(['number', 'boolean', 'string'])

export const stringMessage = 'It should be a string'

export const stringYobta: StringFactory = (message = stringMessage) =>
  ruleYobta((value = '') => {
    if (value instanceof String || coercedTypes.has(typeof value)) {
      return String(value).trim()
    }

    throw new Error(message)
  })
