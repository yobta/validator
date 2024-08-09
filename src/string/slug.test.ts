/* eslint-disable import/extensions */

import { createValidator } from '../createValidator/createValidator'
import { slug, slugMessage } from './slug'
import { string } from './string'

const customMessage = 'yobta!'
const validate = createValidator(slug(customMessage))

it(`accepts valid slug`, async () => {
  const result = validate('user')
  expect(result).toBe('user')
})

it('accepts undefined', () => {
  const validateOptional = createValidator(string(), slug())
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
