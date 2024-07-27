/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { array } from './array'
import { unique } from './unique'

const customMesage = 'yobta'

const validate = createValidator(array(), unique(customMesage))

it('accepts empty array', () => {
  const result = validate([])
  expect(result).toEqual([])
})

it('accepts array of strings', () => {
  const result = validate([1, 2, 3, '', ' '])
  expect(result).toEqual([1, 2, 3, '', ' '])
})

it('rejects duplicate items', () => {
  const attempt = (): any => validate([1, 2, 2])
  expect(attempt).toThrow('yobta')
})

it('has default error message', () => {
  const validateDefault = createValidator(array(), unique())
  const attempt = (): any => validateDefault(['', '2', '2'])
  expect(attempt).toThrow('It should contain unique items')
})
