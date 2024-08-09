import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaOptionaUnknownArray } from '../_types/YobtaOptionaUnknownArray.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const uniqueMessage = 'It should contain unique items'

export function unique<I extends YobtaOptionaUnknownArray>(
  message = uniqueMessage,
): YobtaSyncRule<I, YobtaMaybe<I, I>> {
  return rule((input: I) => {
    if (!input || new Set(input).size === input.length) {
      return input as YobtaMaybe<I, I>
    }
    throw new Error(message)
  })
}
