import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'
import { reSlug } from './reSlug.js'

export const slugMessage = 'It should be a slug'

export const slug = <I extends string | undefined>(
  message = slugMessage,
): YobtaSyncRule<I, YobtaMaybe<I, string>> =>
  rule((value: I) => {
    if (value === undefined || reSlug.test(value)) {
      return value as YobtaMaybe<I, string>
    }
    throw new Error(message)
  })
