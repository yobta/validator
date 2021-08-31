import { createRule, Rule } from '../createRule'
import { isVoid } from '../isVoid'

export const defaultYobta = <I>(defaultValue: I): Rule<any, I> =>
  createRule(input => {
    if (isVoid(input)) return defaultValue
    return input
  })
