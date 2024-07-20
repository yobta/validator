import { isVoid } from '../_internal/isVoid/index.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const defaultYobta = <O>(value: O): SyncRule<unknown, O> =>
  ruleYobta(input => (isVoid(input) ? value : (input as O)))
