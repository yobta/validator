import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const minDateMessage = (limit: Date): string =>
  `It should be at least ${limit.toUTCString()}`

export const minDate = (
  limit: () => Date,
  message = minDateMessage,
): YobtaSyncRule<Date, Date> =>
  createRule((input: Date) => {
    if (input.getTime() < limit().getTime()) {
      throw new Error(message(limit()))
    }

    return input
  })
