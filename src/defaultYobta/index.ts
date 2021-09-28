import { ruleYobta, SyncRule } from '../ruleYobta'
import { isVoid } from '../_internal/isVoid'

export const defaultYobta = <I>(defaultValue: I): SyncRule<any, I> =>
  ruleYobta(input => {
    if (isVoid(input)) return defaultValue
    return input
  })
