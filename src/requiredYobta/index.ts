import { createRule, SyncRule } from '../createRule'

export const requiredMessage = 'Required'

export type Required<O> = O extends undefined ? never : O

export const requiredYobta = <I, O>(
  rule: SyncRule<I, O>,
  message = requiredMessage
): SyncRule<I, Required<O>> =>
  createRule((input, context) => {
    let next = rule(context)(input)
    if (typeof next === 'undefined') throw new Error(message)
    return next as Required<O>
  })
