import { isVoid } from '../_internal/isVoid/index.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const requiredMessage = 'Required'

type Required<O> = O extends undefined ? never : O

interface RequiredFactory {
  <I>(message?: string): SyncRule<Required<I> | undefined, Required<I>>
}

export const requiredYobta: RequiredFactory = <I>(message = requiredMessage) =>
  ruleYobta(input => {
    if (isVoid(input)) throw new Error(message)
    return input as Required<I>
  })
