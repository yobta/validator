import { createRule, SyncRule } from '../createRule'

export const fromEntriesYobta = (): SyncRule<
  Iterable<readonly [PropertyKey, any]>,
  { [k: string]: any }
> => createRule(input => Object.fromEntries(input))
