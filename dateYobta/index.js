import { createRule } from '../createRule/index.js'

export const dateMessage = 'Should be a date'

export const dateYobta = (message = dateMessage) =>
  createRule(input => {
    if (typeof input === 'undefined') return input

    let value = new Date(input)

    if (isNaN(value) || input === null) throw new Error(message)

    return value
  })
