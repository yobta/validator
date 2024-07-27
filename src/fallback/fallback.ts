import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const fallback = <O>(to: () => O): YobtaSyncRule<unknown, O> =>
  rule(value => (value ?? to()) as O)
