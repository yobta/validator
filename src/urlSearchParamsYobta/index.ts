import type { PlainObject } from '../_internal/fromEntries/index.js'
import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface UrlSearchParamsRule {
  (): YobtaOptionalSyncRule<any, PlainObject>
}

export const urlSearchParamsYobta: UrlSearchParamsRule = () =>
  ruleYobta(input => {
    if (input === undefined) {
      return input
    }
    const urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
