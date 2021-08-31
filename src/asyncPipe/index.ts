import { Func1, ArgType, Lookup, Functions, PipeResult, Tail } from '../pipe'

export type PipedPromices<F extends Functions> = F & PromiseChain<F>

type PromiseChain<
  F extends [Func1, ...Func1[]],
  T extends Func1[] = Tail<F>
> = {
  [K in keyof F]: (
    arg: ArgType<F[K]>
  ) =>
    | ArgType<Lookup<T, K, any>, any>
    | Promise<ArgType<Lookup<T, K, any>, any>>
}

export const asyncPipe =
  <F extends Functions>(...functions: PipedPromices<F>) =>
  (input: ArgType<F[0]>): Promise<PipeResult<F>> => {
    return functions.reduce(
      (prev, next) => prev.then(next),
      Promise.resolve(input)
    ) as Promise<PipeResult<F>>
  }
