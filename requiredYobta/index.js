import { createRule } from '../createRule/index.js'

export const requiredMessage = 'Required'

export const requiredYobta = (rule, message = requiredMessage) =>
  createRule((input, context) => {
    let next = rule(context)(input)
    if (typeof next === 'undefined') throw new Error(message)
    return next
  })
