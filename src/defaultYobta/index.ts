import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { isVoid } from '../_internal/isVoid/index.js'

export const defaultYobta = <I>(defaultValue: I): SyncRule<any, I> =>
  ruleYobta(input => {
    if (isVoid(input)) return defaultValue
    return input
  })
