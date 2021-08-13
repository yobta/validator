type Lookup<T, K extends keyof any, Else = never> = K extends keyof T
  ? T[K]
  : Else
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never
type Func1 = (arg: any) => any
type ArgType<F, Else = never> = F extends (arg: infer A) => any ? A : Else
type AsChain<F extends [Func1, ...Func1[]], G extends Func1[] = Tail<F>> = {
  [K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any>
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Last<T extends any[]> = T extends [...infer F, infer L] ? L : never
type LaxReturnType<F> = F extends (...args: any) => infer R ? R : never

export type Funtions = [Func1, ...Func1[]]
export type PipedFunctions<F extends Funtions> = F & AsChain<F>
export type PipeResult<F extends Funtions> = LaxReturnType<Last<F>>
export type PipeFunction<F extends Funtions, I> = (
  ...functions: PipedFunctions<F>
) => (input: I) => PipeResult<F>

export function pipe<F extends Funtions, I>(
  ...functions: PipedFunctions<F>
): (input: I) => PipeResult<F>
