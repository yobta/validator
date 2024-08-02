import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDate = <D extends Date | undefined>(
  limit: () => Date,
  message = maxDateMessage,
): YobtaSyncRule<D, YobtaMaybe<D, D>> =>
  rule((input: D) => {
    if (input && input.getTime() > limit().getTime()) {
      throw new Error(message(limit()))
    }

    return input
  })
