import { createRule } from '../createRule/index.js'

export const testMessage = 'Invalid format'

export const testYobta = (expression, message = testMessage) =>
  createRule(input => {
    if (expression.test(input)) return input
    throw new Error(message)
  })
