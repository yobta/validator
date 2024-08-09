import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDate = <D extends Date | undefined>(
  limit: () => Date,
  message = minDateMessage,
): YobtaSyncRule<D, YobtaMaybe<D, D>> =>
  rule((input: D) => {
    if (input && input.getTime() < limit().getTime()) {
      throw new Error(message(limit()))
    }

    return input as YobtaMaybe<D, D>
  })
