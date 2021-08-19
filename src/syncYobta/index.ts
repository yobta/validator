import { SyncRule } from '../createRule'
import { pipe, Factories, PipedFactories, PipeFactoryResult } from '../pipe'

//#region Types
export type ValidationError = {
  field: string
  message: string
  path: (string | number)[]
}

export type ValidationContext = {
  isAsync: boolean
  field: string
  path: string[]
  pushError(error: ValidationError): void
}

type RuleFactories<I, O> = [SyncRule<I, O>, ...SyncRule<I, O>[]]

export type SyncValidator<I, O, R extends RuleFactories<I, O>> = (
  input: I
) => [PipeFactoryResult<R>, null] | [null, ValidationError[]]
//#endregion

const field = '@root'

export const syncYobta =
  <R extends Factories, I, O>(
    ...rules: PipedFactories<R>
  ): SyncValidator<I, O, R> =>
  input => {
    let errors: ValidationError[] = []
    let context = {
      async: false,
      field,
      path: [],
      pushError(error: ValidationError) {
        errors.push(error)
      }
    }

    let validators = rules.map(next => next(context)) as Factories

    try {
      let result: PipeFactoryResult<R> = pipe(...validators)(input)
      return errors.length ? [null, errors] : [result, null]
    } catch (error) {
      context.pushError({ field, message: error.message, path: [] })
    }

    return [null, errors]
  }
