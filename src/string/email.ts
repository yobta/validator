import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'
import { reEmail } from './reEmail.js'

export const emailMessage = 'It should be an email'

export type YobtaEmail = { __email__: void } & string

export const email = <I extends string>(
  message = emailMessage,
): YobtaSyncRule<I, YobtaEmail> =>
  rule((value: I) => {
    const trimmed = value.trim()
    if (reEmail.test(trimmed)) {
      return trimmed as YobtaEmail
    }
    throw new Error(message)
  })
