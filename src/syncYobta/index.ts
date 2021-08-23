import { SyncRule } from '../createRule'
import { pipe, Factories, PipedFactories, PipeFactoryResult } from '../pipe'
import { YobtaContext } from '../YobtaContext'
import { YobtaError } from '../YobtaError'

//#region Types
export type Path = (string | number)[]

type RuleFactories<I, O> = [SyncRule<I, O>, ...SyncRule<I, O>[]]

export type SyncValidator<I, O, R extends RuleFactories<I, O>> = (
  input: I
) => [PipeFactoryResult<R>, null] | [null, YobtaError[]]
//#endregion

const field = '@root'

export const syncYobta =
  <R extends Factories, I, O>(
    ...rules: PipedFactories<R>
  ): SyncValidator<I, O, R> =>
  data => {
    let errors: YobtaError[] = []
    let context: YobtaContext = {
      data,
      field,
      path: [],
      pushError(error: YobtaError) {
        errors.push(error)
      }
    }

    let validators = rules.map(next => next(context)) as Factories

    try {
      let result: PipeFactoryResult<R> = pipe(...validators)(data)
      return errors.length ? [null, errors] : [result, null]
    } catch (error) {
      context.pushError(
        new YobtaError({ field, message: error.message, path: [] })
      )
    }

    return [null, errors]
  }
