import { createRule } from '../createRule/index.js'

export const minDateMessage = limit =>
  `Should be at least ${limit.toUTCString()}`

export const minDateYobta = (limit, message = minDateMessage) =>
  createRule(input => {
    if (input.getTime() < limit.getTime()) throw new Error(message(limit))

    return input
  })
