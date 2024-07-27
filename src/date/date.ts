import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const dateMessage = 'It should be a date'

export const date = (message = dateMessage): YobtaSyncRule<unknown, Date> =>
  createRule(input => {
    const value = new Date(input as string)

    if (!Number(value)) {
      throw new Error(message)
    }

    return value
  })
