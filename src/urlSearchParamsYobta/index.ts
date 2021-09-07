import { createRule, SyncRule } from '../createRule'

export const urlSearchParamsYobta = (): SyncRule<any, URLSearchParams> =>
  createRule(input => new URLSearchParams(input))
