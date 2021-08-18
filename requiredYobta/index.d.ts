import { SyncRule } from '../createRule/index.js'

export const requiredMessage: string

export type Required<T> = T extends undefined ? never : T

// export type RequiredRule<I extends infer O> = (context: ValidationContext) => (input: I) => I extends undefined ? never : O;

// export function requiredYobta<I, O = never>(
//   message?: string
// ): SyncRule<I, I extends unknown ? O : I>

export function requiredYobta<I, O>(
  rule: SyncRule<I, O>,
  message?: string
): SyncRule<I, Required<O>>

// export function requiredYobta<I>(
//   message?: string
// ): SyncRule<I, I>
// ): RequiredRule<I>
