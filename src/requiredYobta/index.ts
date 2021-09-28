import { ruleYobta, SyncRule } from '../ruleYobta'
import { isVoid } from '../_internal/isVoid'

export const requiredMessage = 'Required'

type Required<O> = O extends undefined ? never : O

export function requiredYobta<I extends any>(
  message = requiredMessage
): SyncRule<I | undefined, Required<I>> {
  return ruleYobta(input => {
    if (isVoid(input)) throw new Error(message)
    return input as Required<I>
  })
}
