import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'
import { reEmail } from './reEmail.js'

export const emailMessage = 'It should be an email'

export type YobtaEmail = { __email__: void } & string

export const email = <I extends string | undefined>(
  message = emailMessage,
): YobtaSyncRule<I, YobtaMaybe<I, YobtaEmail>> =>
  rule((value: I) => {
    if (value === undefined || reEmail.test(value)) {
      return value as unknown as YobtaMaybe<I, YobtaEmail>
    }
    throw new Error(message)
  })
