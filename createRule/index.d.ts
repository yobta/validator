export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown
}
  ? U
  : T

export type TestFunction<I, O> = (data: I) => Promise<O | I> | O | I

export type RuleInput<I> = {
  data: I
  path: string[]
  pushError(message: string, path: string[]): void
}

export type Rule<I, O> = (input: RuleInput<I>) => Promise<O | I>

export function createRule<
  T extends TestFunction,
  I = Parameters<T>[0],
  O = Await<ReturnType<T>>
>(testFunction: T): Rule<I, O>
