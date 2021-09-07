import { createRule, SyncRule } from '../createRule'
import { Functions, pipe } from '../pipe'

// export type SyncRule<I, O> = (input: I) => O
export interface CatchYobta {
  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    fallbackValue: R9,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>,
    rule7: SyncRule<R6, R7>,
    rule8: SyncRule<R7, R8>,
    rule9: SyncRule<R8, R9>
  ): SyncRule<any, R9>
  <R1, R2, R3, R4, R5, R6, R7, R8>(
    fallbackValue: R8,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>,
    rule7: SyncRule<R6, R7>,
    rule8: SyncRule<R7, R8>
  ): SyncRule<any, R8>
  <R1, R2, R3, R4, R5, R6, R7>(
    fallbackValue: R7,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>,
    rule7: SyncRule<R6, R7>
  ): SyncRule<any, R7>
  <R1, R2, R3, R4, R5, R6>(
    fallbackValue: R6,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>
  ): SyncRule<any, R6>
  <R1, R2, R3, R4, R5>(
    fallbackValue: R5,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>
  ): SyncRule<any, R5>
  <R1, R2, R3, R4>(
    fallbackValue: R4,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>
  ): SyncRule<any, R4>
  <R1, R2, R3>(
    fallbackValue: R3,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>
  ): SyncRule<any, R3>
  <R1, R2>(
    fallbackValue: R2,
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>
  ): SyncRule<any, R2>
  <R1>(fallbackValue: R1, rule1: SyncRule<any, R1>): SyncRule<any, R1>
}

export const catchYobta: CatchYobta = (
  fallbackValue: any,
  ...rules: SyncRule<any, any>[]
) => {
  return createRule((input, context) => {
    let next = rules.map(rule => rule(context)) as Functions
    try {
      return pipe(...next)(input)
      // eslint-disable-next-line unicorn/prefer-optional-catch-binding
    } catch (error) {
      return fallbackValue
    }
  })
}
