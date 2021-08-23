import { YobtaContext } from '../YobtaContext'

export type ValidateRule<I, O> = (input: I, context: YobtaContext) => O
export type SyncRule<I, O> = (context: YobtaContext) => (input: I) => O

export const createRule =
  <I, O>(validate: ValidateRule<I, O>): SyncRule<I, O> =>
  context =>
  input =>
    validate(input, context)
