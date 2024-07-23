import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const requiredMessage = 'Required'

export const requiredYobta = <I>(
  message = requiredMessage,
): YobtaSyncRule<unknown, Exclude<I, undefined>> =>
  ruleYobta(input => {
    if (input === undefined) {
      throw new Error(message)
    }
    return input as Exclude<I, undefined>
  })
