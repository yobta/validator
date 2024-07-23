/* eslint-disable import/extensions */

import { stringYobta } from '../stringYobta'
import { createValidator } from '../createValidator/createValidator'
import { YobtaError } from '../YobtaError'
import { emailMessage, emailYobta } from './'

const customMessage = 'yobta!'
const validate = createValidator(stringYobta(), emailYobta(customMessage))

it(`accepts valid emails`, async () => {
  const result = validate('user-@example.org')
  expect(result).toBe('user-@example.org')
})

it('rejects undefined', () => {
  const attempts = (): any => validate(undefined)
  const error = new YobtaError({ field: '@', message: customMessage, path: [] })
  expect(attempts).toThrow(error)
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
  const rule = emailYobta()
  const validateDefault = createValidator(rule)
  const attempt = (): any => validateDefault('yobta')
  expect(attempt).toThrow(emailMessage)
})
