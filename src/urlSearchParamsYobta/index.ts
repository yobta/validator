import { createRule, SyncRule } from '../createRule'
import { fromEntries, PlainObject } from '../_internal/fromEntries'

interface UrlSearchParamsRule {
  (): SyncRule<any, PlainObject>
}

export const urlSearchParamsYobta: UrlSearchParamsRule = () =>
  createRule(input => {
    let urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
