import { createRule, SyncRule } from '../createRule'
import { isVoid } from '../isVoid'

export const defaultYobta = <I>(defaultValue: I): SyncRule<any, I> =>
  createRule(input => {
    if (isVoid(input)) return defaultValue
    return input
  })
