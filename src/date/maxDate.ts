import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDate = (
  limit: () => Date,
  message = maxDateMessage,
): YobtaSyncRule<Date, Date> =>
  rule((input: Date) => {
    if (input.getTime() > limit().getTime()) {
      throw new Error(message(limit()))
    }

    return input
  })
