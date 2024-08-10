/* eslint-disable import/extensions */

import { createValidator } from '../createValidator/createValidator'
import { test } from './test'

it('accepts undefined', () => {
  const validate = createValidator(test(/./, 'yobta!'))
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

it('accepts valid', () => {
  const validate = createValidator(test(/./, 'yobta!'))
  const result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects invalid', () => {
  const validate = createValidator(test(/./, 'yobta!'))
  const attempt = (): any => validate('')
  expect(attempt).toThrow('yobta!')
})
