import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

const truthySet = new Set(['1', 'true', 'yes'])
const falsySet = new Set(['0', 'false', 'no', 'null'])

export const booleanMessage = 'It should be a boolean'

export const boolean = <I>(
  message = booleanMessage,
): YobtaSyncRule<I, YobtaMaybe<I, boolean>> =>
  rule((input: I = '' as I) => {
    if (input === '') {
      return undefined as YobtaMaybe<I, boolean>
    }

    const lowerCasedInput = String(input).toLowerCase()

    if (falsySet.has(lowerCasedInput)) {
      return false as YobtaMaybe<I, boolean>
    } else if (truthySet.has(lowerCasedInput)) {
      return true as YobtaMaybe<I, boolean>
    }

    throw new Error(message)
  })
