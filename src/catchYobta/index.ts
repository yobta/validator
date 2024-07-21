import type { Functions } from '../_internal/pipe/index.js'
import { pipe } from '../_internal/pipe/index.js'
import type { CatchYobta } from '../_types/CatchYobta.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const catchYobta: CatchYobta = (
  fallbackValue: any,
  ...rules: YobtaSyncRule<any, any>[]
) => {
  return ruleYobta((input, context) => {
    const next = rules.map(rule => rule(context)) as Functions
    try {
      return pipe(...next)(input)
    } catch (error) {
      return fallbackValue
    }
  })
}
