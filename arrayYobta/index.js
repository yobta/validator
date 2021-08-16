import { createRule } from '../createRule/index.js'

export const arrayMessage = 'Should be an array'

export const arrayYobta = (message = arrayMessage) =>
  createRule(input => {
    if (!Array.isArray(input) && typeof input !== 'undefined')
      {throw new Error(message)}

    return input
  })
