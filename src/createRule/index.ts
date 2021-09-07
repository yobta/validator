import { YobtaContext } from '../YobtaContext'

type Validate<I, O> = (input: I, context: YobtaContext) => O
export type SyncRule<I, O> = (context: YobtaContext) => (input: I) => O
export type AnySyncRule = SyncRule<any, any>
export type SyncRules = [AnySyncRule, ...AnySyncRule[]]

export type SyncRulesChain1<R1> = [SyncRule<any, R1>]
export type SyncRulesChain2<R1, R2> = [SyncRule<any, R1>, SyncRule<R1, R2>]
export type SyncRulesChain3<R1, R2, R3> = [
  SyncRule<any, R1>,
  SyncRule<R1, R2>,
  SyncRule<R2, R3>
]
export type SyncRulesChain4<R1, R2, R3, R4> = [
  SyncRule<any, R1>,
  SyncRule<R1, R2>,
  SyncRule<R2, R3>,
  SyncRule<R3, R4>
]
export type SyncRulesChain5<R1, R2, R3, R4, R5> = [
  SyncRule<any, R1>,
  SyncRule<R1, R2>,
  SyncRule<R2, R3>,
  SyncRule<R3, R4>,
  SyncRule<R4, R5>
]
export type SyncRulesChain6<R1, R2, R3, R4, R5, R6> = [
  SyncRule<any, R1>,
  SyncRule<R1, R2>,
  SyncRule<R2, R3>,
  SyncRule<R3, R4>,
  SyncRule<R4, R5>,
  SyncRule<R5, R6>
]
export type SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7> = [
  SyncRule<any, R1>,
  SyncRule<R1, R2>,
  SyncRule<R2, R3>,
  SyncRule<R3, R4>,
  SyncRule<R4, R5>,
  SyncRule<R5, R6>,
  SyncRule<R6, R7>
]
export type SyncRulesChain8<R1, R2, R3, R4, R5, R6, R7, R8> = [
  SyncRule<any, R1>,
  SyncRule<R1, R2>,
  SyncRule<R2, R3>,
  SyncRule<R3, R4>,
  SyncRule<R4, R5>,
  SyncRule<R5, R6>,
  SyncRule<R6, R7>,
  SyncRule<R7, R8>
]
export type SyncRulesChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9> = [
  SyncRule<any, R1>,
  SyncRule<R1, R2>,
  SyncRule<R2, R3>,
  SyncRule<R3, R4>,
  SyncRule<R4, R5>,
  SyncRule<R5, R6>,
  SyncRule<R6, R7>,
  SyncRule<R7, R8>,
  SyncRule<R8, R9>
]

export type SyncRulesChain<
  R1,
  R2 = undefined,
  R3 = undefined,
  R4 = undefined,
  R5 = undefined,
  R6 = undefined,
  R7 = undefined,
  R8 = undefined,
  R9 = undefined
> =
  | SyncRulesChain1<R1>
  | SyncRulesChain2<R1, R2>
  | SyncRulesChain3<R1, R2, R3>
  | SyncRulesChain4<R1, R2, R3, R4>
  | SyncRulesChain5<R1, R2, R3, R4, R5>
  | SyncRulesChain6<R1, R2, R3, R4, R5, R6>
  | SyncRulesChain7<R1, R2, R3, R4, R5, R6, R7>
  | SyncRulesChain8<R1, R2, R3, R4, R5, R6, R7, R8>
  | SyncRulesChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9>

export const createRule =
  <I, O>(validate: Validate<I, O>): SyncRule<I, O> =>
  context =>
  input =>
    validate(input, context)
