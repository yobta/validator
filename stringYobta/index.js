import { createRule } from '../createRule/index.js'

let coercedTypes = new Set(['number', 'boolean'])

function coerce(input) {
  if (input === null) return ''
  else if (coercedTypes.has(typeof input) || input instanceof String) {
    return String(input)
  }
  return input
}

export const stringMessage = 'Should be a string'

export const stringYobta = (message = stringMessage) =>
  createRule(input => {
    let value = coerce(input)

    if (typeof value === 'string' || typeof value === 'undefined') return value

    throw new Error(message)
  })
