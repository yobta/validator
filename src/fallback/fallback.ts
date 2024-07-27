import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const fallback = <O>(to: () => O): YobtaSyncRule<unknown, O> =>
  createRule(value => (value ?? to()) as O)
