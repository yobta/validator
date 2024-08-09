import type { YobtaRequiredValue } from '../_types/YobtaRequiredValue.js'
import type { SyncOrAsyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const requiredMessage = 'Required'

export const required = <I>(
  message = requiredMessage,
): SyncOrAsyncRule<I, YobtaRequiredValue<I>> =>
  rule((value = '') => {
    if (value === '') {
      throw new Error(message)
    }
    return value as YobtaRequiredValue<I>
  })
