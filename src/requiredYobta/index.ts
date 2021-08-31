import { createRule, Rule } from '../createRule'
import { isVoid } from '../isVoid'

export const requiredMessage = 'Required'

export type Required<O> = O extends undefined ? never : O

export function requiredYobta<I>(
  message = requiredMessage
): Rule<I | undefined, Required<I>> {
  return createRule(input => {
    if (isVoid(input)) throw new Error(message)
    return input as Required<I>
  })
}

// export const requiredYobta = <I, O>(
//   rule: SyncRule<I, O>,
//   message = requiredMessage
// ): SyncRule<I, Required<O>> =>
//   createRule((input, context) => {
//     let next = rule(context)(input)
//     if (isVoid(next)) throw new Error(message)
//     return next as Required<O>
//   })
