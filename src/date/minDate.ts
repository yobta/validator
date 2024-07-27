import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDate = (
  limit: () => Date,
  message = minDateMessage,
): YobtaSyncRule<Date, Date> =>
  rule((input: Date) => {
    if (input.getTime() < limit().getTime()) {
      throw new Error(message(limit()))
    }

    return input
  })
