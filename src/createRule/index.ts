import { YobtaContext } from '../YobtaContext'

type Validate<I, O> = (input: I, context: YobtaContext) => O
export type Rule<I, O> = (context: YobtaContext) => (input: I) => O

export const createRule =
  <I, O>(validate: Validate<I, O>): Rule<I, O> =>
  context =>
  input =>
    validate(input, context)
