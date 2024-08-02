/* eslint-disable import/extensions */

import { createValidator } from '../createValidator/createValidator'
import { optional } from '../optional/optional'
import { YobtaError } from '../YobtaError'
import { email, emailMessage } from './email'
import { string } from './string'

const customMessage = 'yobta!'
const validate = createValidator(string(), email(customMessage))

it(`accepts valid emails`, async () => {
  const result = validate('user-@example.org')
  expect(result).toBe('user-@example.org')
})

it('rejects undefined when not optional', () => {
  const attempts = (): any => validate(undefined)
  const error = new YobtaError({ field: '@', message: customMessage, path: [] })
  expect(attempts).toThrow(error)
})

it('accepts undefined when optional', () => {
  const validateOptional = createValidator(string(), optional(), email())
  const result = validateOptional(undefined)
  expect(result).toBeUndefined()
})

it('trims whitespace', () => {
  const result = validate(' bill@microsoft.com ')
  expect(result).toBe('bill@microsoft.com')
})

it(`rejects invalid email`, () => {
  const attempt = (): any => validate('QA[icon]CHOCOLATE[icon]@test.com')
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  const rule = email()
  const validateDefault = createValidator(rule)
  const attempt = (): any => validateDefault('yobta')
  expect(attempt).toThrow(emailMessage)
})
