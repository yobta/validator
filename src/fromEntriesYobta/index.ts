import { createRule, Rule } from '../createRule'

export const fromEntriesYobta = (): Rule<
  Iterable<readonly [PropertyKey, any]>,
  { [k: string]: any }
> => createRule(input => Object.fromEntries(input))
