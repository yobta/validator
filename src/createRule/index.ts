import { ValidationContext } from '../syncYobta'

export type ValidateRule<I, O> = (input: I, context: ValidationContext) => O
export type SyncRule<I, O> = (context: ValidationContext) => (input: I) => O

export const createRule =
  <I, O>(validate: ValidateRule<I, O>): SyncRule<I, O> =>
  context =>
  input =>
    validate(input, context)
