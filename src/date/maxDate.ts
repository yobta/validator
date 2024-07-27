import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const maxDateMessage = (limit: Date): string =>
  `It should be within ${limit.toUTCString()}`

export const maxDate = (
  limit: () => Date,
  message = maxDateMessage,
): YobtaSyncRule<Date, Date> =>
  createRule((input: Date) => {
    if (input.getTime() > limit().getTime()) {
      throw new Error(message(limit()))
    }

    return input
  })
