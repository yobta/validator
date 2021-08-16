import { createRule } from '../createRule/index.js'

export const integerMessage = 'Should be an integer'

export const integerYobta = (message = integerMessage) =>
  createRule(input => {
    if (Number.isInteger(input) || typeof input === 'undefined') return input

    throw new Error(message)
  })
