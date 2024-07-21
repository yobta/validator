import type { YobtaSyncRule } from '../ruleYobta'

export type YobtaSyncChain1<R1> = [YobtaSyncRule<unknown, R1>]

export type YobtaSyncChain2<R1, R2> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
]

export type YobtaSyncChain3<R1, R2, R3> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
]

export type YobtaSyncChain4<R1, R2, R3, R4> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
]

export type YobtaSyncChain5<R1, R2, R3, R4, R5> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
]

export type YobtaSyncChain6<R1, R2, R3, R4, R5, R6> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
  YobtaSyncRule<R5, R6>,
]

export type YobtaSyncChain7<R1, R2, R3, R4, R5, R6, R7> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
  YobtaSyncRule<R5, R6>,
  YobtaSyncRule<R6, R7>,
]

export type YobtaSyncChain8<R1, R2, R3, R4, R5, R6, R7, R8> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
  YobtaSyncRule<R5, R6>,
  YobtaSyncRule<R6, R7>,
  YobtaSyncRule<R7, R8>,
]

export type YobtaSyncChain9<R1, R2, R3, R4, R5, R6, R7, R8, R9> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
  YobtaSyncRule<R5, R6>,
  YobtaSyncRule<R6, R7>,
  YobtaSyncRule<R7, R8>,
  YobtaSyncRule<R8, R9>,
]

export type YobtaSyncChain10<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
  YobtaSyncRule<R5, R6>,
  YobtaSyncRule<R6, R7>,
  YobtaSyncRule<R7, R8>,
  YobtaSyncRule<R8, R9>,
  YobtaSyncRule<R9, R10>,
]

export type YobtaSyncChain11<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11> = [
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
  YobtaSyncRule<R5, R6>,
  YobtaSyncRule<R6, R7>,
  YobtaSyncRule<R7, R8>,
  YobtaSyncRule<R8, R9>,
  YobtaSyncRule<R9, R10>,
  YobtaSyncRule<R10, R11>,
]

export type YobtaSyncChain12<
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
  YobtaSyncRule<unknown, R1>,
  YobtaSyncRule<R1, R2>,
  YobtaSyncRule<R2, R3>,
  YobtaSyncRule<R3, R4>,
  YobtaSyncRule<R4, R5>,
  YobtaSyncRule<R5, R6>,
  YobtaSyncRule<R6, R7>,
  YobtaSyncRule<R7, R8>,
  YobtaSyncRule<R8, R9>,
  YobtaSyncRule<R9, R10>,
  YobtaSyncRule<R10, R11>,
  YobtaSyncRule<R11, R12>,
]
