import { createRule } from '../createRule/index.js'

export const maximumYobtaMessage = limit => `Should be within ${limit}`

export const maximumYobta = (limit, message = maximumYobtaMessage) =>
  createRule(input => {
    if (input > limit) throw new Error(message(limit))

    return input
  })
