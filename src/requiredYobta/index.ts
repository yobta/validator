import { isVoid } from '../_internal/isVoid/index.js'
import type { YobtaRequiredValue } from '../_types/YobtaRequiredValue.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const requiredMessage = 'Required'

interface RequiredFactory {
  <I>(message?: string): SyncRule<I, YobtaRequiredValue<I>>
}

export const requiredYobta: RequiredFactory = <I>(message = requiredMessage) =>
  ruleYobta(input => {
    if (isVoid(input)) {
      throw new Error(message)
    }
    return input as YobtaRequiredValue<I>
  })
