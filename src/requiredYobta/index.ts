import { ruleYobta, SyncRule } from '../ruleYobta'
import { isVoid } from '../_internal/isVoid'

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
