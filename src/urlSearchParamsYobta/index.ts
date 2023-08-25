import { fromEntries } from '../_internal/fromEntries/index.js'
import type { PlainObject } from '../_internal/fromEntries/index.js'
import { ruleYobta } from '../ruleYobta/index.js'
import type { SyncRule } from '../ruleYobta/index.js'

interface UrlSearchParamsRule {
  (): SyncRule<any, PlainObject>
}

export const urlSearchParamsYobta: UrlSearchParamsRule = () =>
  ruleYobta(input => {
    let urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
