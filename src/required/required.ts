import type { YobtaRequiredValue } from '../_types/YobtaRequiredValue.js'
import type { SyncOrAsyncRule, YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const requiredMessage = 'Required'

interface YobtaRequired {
  <I>(message?: string): YobtaSyncRule<I, YobtaRequiredValue<I>>
  <I>(message?: string): YobtaSyncRule<I, YobtaRequiredValue<Awaited<I>>>
}

export const required: YobtaRequired = <I>(
  message = requiredMessage,
): SyncOrAsyncRule<I, YobtaRequiredValue<I>> =>
  rule((value: I = '' as I) => {
    if (value === '') {
      throw new Error(message)
    }
    return value as YobtaRequiredValue<I>
  })
