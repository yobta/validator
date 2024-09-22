import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const dateMessage = 'It should be a date'

export const date = <I>(
  message = dateMessage,
): YobtaSyncRule<I, Date | undefined> =>
  rule((input = '' as I) => {
    if (input === '') {
      return undefined
    }

    const value = new Date(input as string)

    if (!Number(value)) {
      throw new Error(message)
    }

    return value
  })
