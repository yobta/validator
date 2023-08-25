import { isVoid } from '../_internal/isVoid/index.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const requiredMessage = 'Required'

type Required<O> = O extends undefined ? never : O

interface FequiredFactory {
  <I extends any>(message?: string): SyncRule<I | undefined, Required<I>>
}

export const requiredYobta: FequiredFactory = <I>(message = requiredMessage) =>
  ruleYobta(input => {
    if (isVoid(input)) throw new Error(message)
    return input as Required<I>
  })
