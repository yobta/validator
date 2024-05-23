import { isVoid } from '../_internal/isVoid/index.js'
import type { SyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

export const defaultYobta = <I>(defaultValue: I): SyncRule<any, I> =>
  ruleYobta(input => {
    if (isVoid(input)) return defaultValue
    return input
  })
