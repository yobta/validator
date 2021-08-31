import { Rule } from '../createRule'
import { pipe, Factories, PipedFactories, PipeFactoryResult } from '../pipe'
import { YobtaContext } from '../YobtaContext'
import { YobtaError } from '../YobtaError'

//#region Types
export type Path = (string | number)[]

type RuleFactories<I, O> = [Rule<I, O>, ...Rule<I, O>[]]

export type SyncValidator<I, O, R extends RuleFactories<I, O>> = (
  input: I
) => PipeFactoryResult<R>
//#endregion

const field = '@root'

export const syncYobta =
  <R extends Factories, I, O>(
    ...rules: PipedFactories<R>
  ): SyncValidator<I, O, R> =>
  data => {
    let context: YobtaContext = {
      data,
      field,
      path: [],
      pushError(error: YobtaError) {
        throw error
      }
    }

    let validators = rules.map(next => next(context)) as Factories

    try {
      return pipe(...validators)(data)
    } catch (error) {
      throw new YobtaError({ field, message: error.message, path: [] })
    }
  }
