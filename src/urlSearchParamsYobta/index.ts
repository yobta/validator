import type { PlainObject } from '../_internal/fromEntries/index.js'
import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const urlSearchParamsYobta = (): YobtaSyncRule<any, PlainObject> =>
  ruleYobta((input: any) => {
    const urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
