import { Await, Rule } from '../createRule/index.js'

export type ValidationError = {
  message: string
  path: string[]
}
export type Validator<I, O> = (data: I) => Promise<[O, ValidationError[]]>

export function createValidator<
  R extends Rule,
  I = Parameters<R>[0]['data'],
  O = Await<ReturnType<R>>
>(rule: R): Validator<I, O>
