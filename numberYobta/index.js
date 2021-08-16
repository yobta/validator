import { createRule } from '../createRule/index.js'

let coercedTypes = new Set(['string', 'boolean'])

function coerce(input) {
  if (input === null) return 0
  else if (coercedTypes.has(typeof input)) return Number(input)
  return input
}

export const numberMessage = 'Should be a number'

export const numberYobta = (message = numberMessage) =>
  createRule(input => {
    let value = coerce(input)

    if (
      (typeof value === 'number' && !isNaN(value) && Number.isFinite(value)) ||
      typeof value === 'undefined'
    )
      {return value}

    throw new Error(message)
  })
