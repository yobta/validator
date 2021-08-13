import { SyncRule } from '../createRule/index.js'
import { Funtions, PipedFunctions, PipeResult } from '../pipe/index.js'

type Result<R extends Record<string, Funtions>> = {
  [Property in keyof R]: PipeResult<R[Property]>
}

type Config<R extends Record<string, Funtions>> = {
  [Property in keyof R]: PipedFunctions<R[Property]>
}

export function plainObjectType<
  R extends Record<string, Funtions>,
  I,
  C extends string
>(rulesSet: Config<R>, message?: C): SyncRule<I, Result<R>>
