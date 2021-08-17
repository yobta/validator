/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable unicorn/better-regex */
import { createRule } from '../createRule/index.js'

// RFC 5322
export const EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

export const emailMessage = 'Should be an email'

export const emailYobta = (message = emailMessage) =>
  createRule(input => {
    if (typeof input === 'undefined') return input

    let value = input.trim()

    if (EMAIL.test(value)) return value

    throw new Error(message)
  })
