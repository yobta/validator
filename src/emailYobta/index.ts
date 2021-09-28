/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable unicorn/better-regex */
import { ruleYobta, SyncRule } from '../ruleYobta'

// RFC 5322
export const EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

export const emailMessage = 'It should be an email'

export const emailYobta = (
  message = emailMessage
): SyncRule<string | undefined, string | undefined> =>
  ruleYobta(input => {
    if (typeof input === 'undefined') return input

    let value = input.trim()

    if (EMAIL.test(value)) return value

    throw new Error(message)
  })
