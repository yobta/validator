import { ValidationContext } from '../syncYobta/index.js'

export type ValidateRule<I, O> = (input: I, context: ValidationContext) => O

export type SyncRule<I, O> = (context: ValidationContext) => (input: I) => O

export function createRule<I, O>(validate: ValidateRule<I, O>): SyncRule<I, O>
