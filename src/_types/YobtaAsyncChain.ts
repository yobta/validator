import type { SyncOrAsyncRule } from '../createRule/createRule'

export type YobtaAsyncChain1<R1> = [SyncOrAsyncRule<unknown, R1>]

export type YobtaAsyncChain2<R1, R2> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
]

export type YobtaAsyncChain3<R1, R2, R3> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
]

export type YobtaAsyncChain4<R1, R2, R3, R4> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
]

export type YobtaAsyncChain5<R1, R2, R3, R4, R5> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
]

export type YobtaAsyncChain6<R1, R2, R3, R4, R5, R6> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
]

export type YobtaAsyncChain7<R1, R2, R3, R4, R5, R6, R7> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
]

export type YobtaAsyncChain8<R1, R2, R3, R4, R5, R6, R7, R8> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
  SyncOrAsyncRule<R7, R8>,
]

export type YobtaAsyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
  SyncOrAsyncRule<R7, R8>,
  SyncOrAsyncRule<R8, R9>,
]

export type YobtaAsyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
  SyncOrAsyncRule<R7, R8>,
  SyncOrAsyncRule<R8, R9>,
  SyncOrAsyncRule<R9, R10>,
]

export type YobtaAsyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
  SyncOrAsyncRule<R7, R8>,
  SyncOrAsyncRule<R8, R9>,
  SyncOrAsyncRule<R9, R10>,
  SyncOrAsyncRule<R10, R11>,
]

export type YobtaAsyncChain12<
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11,
  R12,
> = [
  SyncOrAsyncRule<unknown, R1>,
  SyncOrAsyncRule<R1, R2>,
  SyncOrAsyncRule<R2, R3>,
  SyncOrAsyncRule<R3, R4>,
  SyncOrAsyncRule<R4, R5>,
  SyncOrAsyncRule<R5, R6>,
  SyncOrAsyncRule<R6, R7>,
  SyncOrAsyncRule<R7, R8>,
  SyncOrAsyncRule<R8, R9>,
  SyncOrAsyncRule<R9, R10>,
  SyncOrAsyncRule<R10, R11>,
  SyncOrAsyncRule<R11, R12>,
]
