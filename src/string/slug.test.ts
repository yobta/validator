/* eslint-disable import/extensions */

import { createValidator } from '../createValidator/createValidator'
import { optional } from '../optional/optional'
import { YobtaError } from '../YobtaError'
import { slug, slugMessage } from './slug'
import { string } from './string'

const customMessage = 'yobta!'
const validate = createValidator(string(), slug(customMessage))

it(`accepts valid slug`, async () => {
  const result = validate('user')
  expect(result).toBe('user')
})

it('rejects undefined when not optional', () => {
  const attempts = (): any => validate(undefined)
  const error = new YobtaError({ field: '@', message: customMessage, path: [] })
  expect(attempts).toThrow(error)
})

it('accepts undefined when optional', () => {
  const validateOptional = createValidator(string(), optional(), slug())
  const result = validateOptional(undefined)
  expect(result).toBeUndefined()
})

it(`rejects invalid email`, () => {
  const attempt = (): any => validate('QA[icon]CHOCOLATE[icon]@test.com')
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  const validateDefault = createValidator(slug())
  const attempt = (): any => validateDefault('y o b t a')
  expect(attempt).toThrow(slugMessage)
})
