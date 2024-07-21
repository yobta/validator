import type { PlainObject } from '../_internal/fromEntries/index.js'
import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface UrlSearchParamsRule {
  (): YobtaSyncRule<any, PlainObject>
}

export const urlSearchParamsYobta: UrlSearchParamsRule = () =>
  ruleYobta(input => {
    const urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
