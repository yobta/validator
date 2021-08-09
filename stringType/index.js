import { createRule } from '../createRule/index.js'
import { invariant } from '../invariant/index.js'
import { isOptional } from '../isOptional/index.js'

export const stringTypeMessage = 'Should be a string'

export const stringType = message =>
  createRule(data => {
    invariant(
      isOptional(data) || typeof data === 'string' || data instanceof String,
      message || stringTypeMessage
    )
    return data
  })
