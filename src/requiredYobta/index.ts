import type { YobtaEmpty } from '../_types/YobtaEmpty.js'
import type { YobtaRequiredValue } from '../_types/YobtaRequiredValue.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const requiredMessage = 'Required'

export const requiredYobta = <I>(
  message = requiredMessage,
): YobtaSyncRule<I, Exclude<I, YobtaEmpty>> =>
  ruleYobta(input => {
    if (input === undefined) {
      throw new Error(message)
    }
    return input as YobtaRequiredValue<I>
  })
