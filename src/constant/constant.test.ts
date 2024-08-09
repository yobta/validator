/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { string } from '../string'
import { constant, constantMessage } from './constant'

it('accepts identical', () => {
  const validate = createValidator(string(), constant('a'))
  const result = validate('a')
  expect(result).toEqual('a')
})

it('accepts undefined', () => {
  const validate = createValidator(constant('a'))
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

it('casts empty string to undefined', () => {
  const validate = createValidator(constant('a'))
  const result = validate('')
  expect(result).toBeUndefined()
})

it('rejects not identical', () => {
  const validate = createValidator(constant('b', 'yobta'))
  const attempt = (): any => validate('a')
  expect(attempt).toThrow('yobta')
})

it('has default error mesage', () => {
  const validate = createValidator(constant('b'))
  const attempt = (): any => validate('a')
  expect(attempt).toThrow(constantMessage('b'))
})
