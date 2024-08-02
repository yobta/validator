import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const dateMessage = 'It should be a date'

export const date = (message = dateMessage): YobtaSyncRule<unknown, Date> =>
  rule((input = new Date()) => {
    const value = new Date(input as string)

    if (!Number(value)) {
      throw new Error(message)
    }

    return value
  })
