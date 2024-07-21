import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const defaultYobta = <O>(defaultValue: O): YobtaSyncRule<unknown, O> =>
  ruleYobta(value => (value ?? defaultValue) as O)
