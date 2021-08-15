import { SyncRule } from '../createRule/index.js'

export type ValidationError = {
  field: string
  message: string
  path: string[]
}

export type ValidationContext = {
  isAsync: boolean
  field?: string
  path: string[]
  pushError(error: ValidationError): void
}

export type SyncValidator<D, O> = (
  data: D
) => [O, null] | [null, ValidationError[]]

export function createSyncValidator<I, O>(
  rule: SyncRule<I, O>
): SyncValidator<I, O>
