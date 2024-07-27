import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'
import { reEmail } from './reEmail.js'

export const emailMessage = 'It should be an email'

export type YobtaEmail = { __email__: void } & string

export const email = <I extends string>(
  message = emailMessage,
): YobtaSyncRule<I, YobtaEmail> =>
  createRule((value: I) => {
    const trimmed = value.trim()
    if (reEmail.test(trimmed)) {
      return trimmed as YobtaEmail
    }
    throw new Error(message)
  })
