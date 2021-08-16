import { createRule } from '../createRule/index.js'

export const minimumYobtaMessage = limit => `Should be at least ${limit}`

export const minimumYobta = (limit, message = minimumYobtaMessage) =>
  createRule(input => {
    if (input < limit) throw new Error(message(limit))

    return input
  })
