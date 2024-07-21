import { isVoid } from '../_internal/isVoid/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const defaultYobta = <O>(value: O): YobtaSyncRule<unknown, O> =>
  ruleYobta(input => (isVoid(input) ? value : (input as O)))
