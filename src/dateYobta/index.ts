import { createRule, Rule } from '../createRule'

export const dateMessage = 'It should be a date'

export const dateYobta = (message = dateMessage): Rule<any, Date | undefined> =>
  createRule(input => {
    if (typeof input === 'undefined') return input

    let value = new Date(input)

    if (isNaN(value.getTime()) || input === null) throw new Error(message)

    return value
  })
