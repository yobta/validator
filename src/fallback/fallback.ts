import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const fallback = <O>(to: () => O): YobtaSyncRule<unknown, O> =>
  ruleYobta(value => (value ?? to()) as O)
