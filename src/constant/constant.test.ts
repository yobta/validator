/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { string } from '../string'
import { constant, constantMessage } from './constant'

it('accepts when identical', () => {
  const validate = createValidator(string(), constant('a'))
  const result = validate('a')
  expect(result).toEqual('a')
})

it('accepts when undefined', () => {
  const validate = createValidator(constant('a'))
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects when not identical', () => {
  const validate = createValidator(constant('b', 'yobta'))
  const attempt = (): any => validate('a')
  expect(attempt).toThrow('yobta')
})

it('has default error mesage', () => {
  const validate = createValidator(constant('b'))
  const attempt = (): any => validate('a')
  expect(attempt).toThrow(constantMessage('b'))
})
