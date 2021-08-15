import { SyncRule } from '../createRule/index.js'
import { PipeFactoryResult, Factories, PipedFactories } from '../pipe/index.js'

type Result<R extends Record<string, Factories>> = {
  [Property in keyof R]: PipeFactoryResult<R[Property]>
}

type Config<R extends Record<string, Factories>> = {
  [K in keyof R]: PipedFactories<R[K]>
}

export const plainObjectTypeMessage: string

export function plainObjectType<
  R extends Record<string, Factories>,
  I,
  C extends string
>(config: Config<R>, message?: C): SyncRule<I, Result<R>>
