import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

const truthySet = new Set(['1', 'yes', 'true'])
const falsySet = new Set(['0', 'no', 'false', 'null'])

export const booleanMessage = 'It should be a boolean'

interface BooleanFactory {
  (message?: string): YobtaSyncRule<unknown, boolean>
}

export const boolean: BooleanFactory = message =>
  ruleYobta<unknown, boolean>(input => {
    const lowerCasedInput = String(input).toLowerCase()
    if (falsySet.has(lowerCasedInput)) {
      return false
    } else if (truthySet.has(lowerCasedInput)) {
      return true
    }

    throw new Error(message || booleanMessage)
  })
