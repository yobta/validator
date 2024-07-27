import type { PlainObject } from '../_internal/fromEntries/index.js'
import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const urlSearchParamsYobta = (): YobtaSyncRule<any, PlainObject> =>
  rule((input: any) => {
    const urlSearchParams = new URLSearchParams(input)
    return fromEntries(urlSearchParams)
  })
