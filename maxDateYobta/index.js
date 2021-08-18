import { createRule } from '../createRule/index.js'

export const maxDateMessage = limit => `Should be within ${limit.toUTCString()}`

export const maxDateYobta = (limit, message = maxDateMessage) =>
  createRule(input => {
    if (input.getTime() > limit.getTime()) throw new Error(message(limit))

    return input
  })
