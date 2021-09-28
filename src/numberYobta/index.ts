import { ruleYobta, SyncRule } from '../ruleYobta'

let coercedTypes = new Set(['string', 'boolean'])

function coerce<I>(input: I): number | I {
  if (input === null) return 0
  else if (coercedTypes.has(typeof input)) return Number(input)
  return input
}

export const numberMessage = 'It should be a number'

export const numberYobta = (
  message = numberMessage
): SyncRule<any, number | undefined> =>
  ruleYobta(input => {
    let value = coerce(input)

    if (
      (typeof value === 'number' && !isNaN(value) && Number.isFinite(value)) ||
      typeof value === 'undefined'
    ) {
      return value
    }

    throw new Error(message)
  })
