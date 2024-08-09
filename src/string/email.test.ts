/* eslint-disable import/extensions */

import { createValidator } from '../createValidator/createValidator'
import { required } from '../required/required'
import { email, emailMessage } from './email'
import { string } from './string'

const customMessage = 'yobta!'
const validate = createValidator(string(), required(), email(customMessage))

it(`accepts valid emails`, async () => {
  const result = validate('user-@example.org')
  expect(result).toBe('user-@example.org')
})

it('accepts undefined when optional', () => {
  const validateOptional = createValidator(string(), email())
  const result = validateOptional(undefined)
  expect(result).toBeUndefined()
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
