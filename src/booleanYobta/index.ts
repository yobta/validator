import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

const truthySet = new Set([1, '1', 'yes', 'true'])
const falsySet = new Set([0, '0', 'no', 'false', 'null', null])

function coerce(input: any): boolean {
  let lowerCasedInput = typeof input === 'string' ? input.toLowerCase() : input
  if (falsySet.has(lowerCasedInput)) return false
  else if (truthySet.has(lowerCasedInput)) return true
  return input
}

export const booleanMessage = 'It should be a boolean'

interface BooleanFactory {
  (message?: string): SyncRule<any, boolean>
}

export const booleanYobta: BooleanFactory = (message = booleanMessage) =>
  ruleYobta(input => {
    let value = coerce(input)

    if (typeof value === 'boolean' || typeof value === 'undefined') {
      return value
    }

    throw new Error(message)
  })
