import { ruleYobta, SyncRule } from '../ruleYobta'
import { fromEntries, PlainObject } from '../_internal/fromEntries'

interface UrlSearchParamsRule {
  (): SyncRule<any, PlainObject>
}

export const urlSearchParamsYobta: UrlSearchParamsRule = () =>
  ruleYobta(input => {
    let urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
