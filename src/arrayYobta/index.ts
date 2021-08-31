import { createRule, Rule } from '../createRule'

export const arrayMessage = 'It should be an array'

export const arrayYobta = (
  message: string = arrayMessage
): Rule<any, any[] | undefined> =>
  createRule(input => {
    if (!Array.isArray(input) && typeof input !== 'undefined') {
      throw new Error(message)
    }

    return input
  })
