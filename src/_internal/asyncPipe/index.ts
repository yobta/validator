import type {
  ArgType,
  Func1,
  Functions,
  Lookup,
  PipeResult,
  Tail,
} from '../pipe/index.js'

export type PipedPromices<F extends Functions> = F & PromiseChain<F>

type PromiseChain<F extends Functions, T extends Func1[] = Tail<F>> = {
  [K in keyof F]: (
    arg: ArgType<F[K]>,
  ) =>
    | ArgType<Lookup<T, K, any>, any>
    | Promise<ArgType<Lookup<T, K, any>, any>>
}

export const asyncPipe =
  <F extends Functions>(...functions: PipedPromices<F>) =>
  async (input: ArgType<F[0]>): Promise<PipeResult<F>> => {
    for await (const fn of functions) {
      input = await fn(input)
    }
    return input as PipeResult<F>
  }
