import type { PlainObject } from '../_internal/fromEntries/index.js'
import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const urlSearchParamsYobta = (): YobtaSyncRule<any, PlainObject> =>
  createRule((input: any) => {
    const urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
