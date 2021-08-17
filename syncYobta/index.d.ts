import { SyncRule } from '../createRule/index.js'
import { Factories, PipedFactories, PipeFactoryResult } from '../pipe/index.js'

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

type RuleFactories<I, O> = [SyncRule<I, O>, ...SyncRule<I, O>[]]

export type SyncValidator<I, O, R extends RuleFactories<I, O>> = (
  input: I
) => [PipeFactoryResult<R>, null] | [null, ValidationError[]]

export function syncYobta<R extends Factories, I, O>(
  ...rules: PipedFactories<R>
): SyncValidator<I, O, R>
