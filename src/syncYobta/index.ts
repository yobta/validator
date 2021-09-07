import { SyncRule } from '../createRule'
import { pipe, Factories } from '../pipe'
import { YobtaContext } from '../YobtaContext'
import { YobtaError } from '../YobtaError'

//#region Types
export type SyncYobtaRule<I, O> = (input: I) => O
export interface SyncYobta {
  <R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>,
    rule7: SyncRule<R6, R7>,
    rule8: SyncRule<R7, R8>,
    rule9: SyncRule<R8, R9>
  ): SyncYobtaRule<any, R9>
  <R1, R2, R3, R4, R5, R6, R7, R8>(
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>,
    rule7: SyncRule<R6, R7>,
    rule8: SyncRule<R7, R8>
  ): SyncYobtaRule<any, R8>
  <R1, R2, R3, R4, R5, R6, R7>(
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>,
    rule7: SyncRule<R6, R7>
  ): SyncYobtaRule<any, R7>
  <R1, R2, R3, R4, R5, R6>(
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>,
    rule6: SyncRule<R5, R6>
  ): SyncYobtaRule<any, R6>
  <R1, R2, R3, R4, R5>(
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>,
    rule5: SyncRule<R4, R5>
  ): SyncYobtaRule<any, R5>
  <R1, R2, R3, R4>(
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>,
    rule4: SyncRule<R3, R4>
  ): SyncYobtaRule<any, R4>
  <R1, R2, R3>(
    rule1: SyncRule<any, R1>,
    rule2: SyncRule<R1, R2>,
    rule3: SyncRule<R2, R3>
  ): SyncYobtaRule<any, R3>
  <R1, R2>(rule1: SyncRule<any, R1>, rule2: SyncRule<R1, R2>): SyncYobtaRule<
    any,
    R2
  >
  <R1>(rule1: SyncRule<any, R1>): SyncYobtaRule<any, R1>
}
//#endregion

const field = '@root'

export const syncYobta: SyncYobta =
  (...rules: SyncRule<any, any>[]) =>
  (data: any) => {
    let context: YobtaContext = {
      data,
      field,
      path: [],
      pushError(error: YobtaError) {
        throw error
      }
    }

    let validators = rules.map(next => next(context)) as Factories

    try {
      return pipe(...validators)(data)
    } catch (error) {
      throw new YobtaError({ field, message: error.message, path: [] })
    }
  }
