import { createRule, Rule } from '../createRule'
import {
  Factories,
  Functions,
  pipe,
  PipedFactories,
  PipeFactoryResult
} from '../pipe'

export function catchYobta<F extends Factories, I extends PipeFactoryResult<F>>(
  fallbackValue: I,
  ...rules: PipedFactories<F>
): Rule<any, PipeFactoryResult<F>> {
  return createRule((input, context) => {
    let next = rules.map(rule => rule(context)) as Functions
    try {
      return pipe(...next)(input)
      // eslint-disable-next-line unicorn/prefer-optional-catch-binding
    } catch (error) {
      return fallbackValue
    }
  })
}
