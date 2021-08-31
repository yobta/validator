import { createRule, Rule } from '../createRule'
import {
  Factories,
  Functions,
  pipe,
  PipedFactories,
  PipeFactoryResult
} from '../pipe'
import { YobtaError } from '../YobtaError'

export function itemsYobta<F extends Factories>(
  ...rules: PipedFactories<F>
): Rule<any[], PipeFactoryResult<F>[]> {
  return createRule((input, context) => {
    let next = rules.map(rule => rule(context)) as Functions

    return input.map((item, index) => {
      try {
        return pipe(...next)(item)
      } catch (error) {
        context.pushError(
          new YobtaError({
            message: error.message,
            field: context.field,
            path: [...context.path, index]
          })
        )
        return item
      }
    })
  })
}
