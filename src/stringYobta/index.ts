import { createRule, SyncRule } from '../createRule'

let coercedTypes = new Set(['number', 'boolean'])

function coerce<I>(input: I): string | I {
  if (input === null) return ''
  else if (coercedTypes.has(typeof input) || input instanceof String) {
    return String(input)
  }
  return input
}

export const stringMessage = 'It should be a string'

export const stringYobta = (
  message = stringMessage
): SyncRule<any, string | undefined> =>
  createRule(input => {
    let value = coerce(input)

    if (typeof value === 'string' || typeof value === 'undefined') return value

    throw new Error(message)
  })
