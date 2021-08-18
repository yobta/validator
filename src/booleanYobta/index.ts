import { createRule, SyncRule } from '../createRule'

const truthySet = new Set([1, '1', 'yes', 'true'])
const falsySet = new Set([0, '0', 'no', 'false', 'null', null])

function coerce(input: any): boolean {
  let lowerCasedInput = typeof input === 'string' ? input.toLowerCase() : input
  if (falsySet.has(lowerCasedInput)) return false
  else if (truthySet.has(lowerCasedInput)) return true
  return input
}

export const booleanMessage = 'Should be a boolean'

export const booleanYobta = (
  message = booleanMessage
): SyncRule<any, boolean | undefined> =>
  createRule(input => {
    let value = coerce(input)

    if (typeof value === 'boolean' || typeof value === 'undefined') return value

    throw new Error(message)
  })
