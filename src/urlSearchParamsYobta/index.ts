import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { fromEntries, PlainObject } from '../_internal/fromEntries/index.js'

interface UrlSearchParamsRule {
  (): SyncRule<any, PlainObject>
}

export const urlSearchParamsYobta: UrlSearchParamsRule = () =>
  ruleYobta(input => {
    let urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
