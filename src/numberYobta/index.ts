import { createRule, SyncRule } from '../createRule'

let coercedTypes = new Set(['string', 'boolean'])

function coerce<I>(input: I): number | I {
  if (input === null) return 0
  else if (coercedTypes.has(typeof input)) return Number(input)
  return input
}

export const numberMessage = 'Should be a number'

export const numberYobta = (
  message = numberMessage
): SyncRule<any, number | undefined> =>
  createRule(input => {
    let value = coerce(input)

    if (
      (typeof value === 'number' && !isNaN(value) && Number.isFinite(value)) ||
      typeof value === 'undefined'
    ) {
      return value
    }

    throw new Error(message)
  })
