import { ruleYobta, SyncRule } from '../ruleYobta'

interface StringFactory {
  (message?: string): SyncRule<any, string>
}

const coercedTypes = new Set(['number', 'boolean'])

export const stringMessage = 'It should be a string'

export const stringYobta: StringFactory = (message = stringMessage) =>
  ruleYobta(value => {
    if (value === null || typeof value === 'undefined') {
      return ''
    } else if (coercedTypes.has(typeof value) || value instanceof String) {
      return String(value)
    } else if (typeof value === 'string') {
      return value
    }

    throw new Error(message)
  })
