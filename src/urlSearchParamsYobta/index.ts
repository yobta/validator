import { createRule, Rule } from '../createRule'

export const urlSearchParamsYobta = (): Rule<any, URLSearchParams> =>
  createRule(input => new URLSearchParams(input))
