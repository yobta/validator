/* eslint-disable import/extensions */
import { array } from '../array/array'
import { createValidator } from '../createValidator/createValidator'
import { requiredYobta } from '../requiredYobta'
import { uniqueYobta } from './'

const customMesage = 'yobta'

const validate = createValidator(
  array(),
  requiredYobta(),
  uniqueYobta(customMesage),
)

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
  const validateDefault = createValidator(
    array(),
    requiredYobta(),
    uniqueYobta(),
  )
  const attempt = (): any => validateDefault(['', '2', '2'])
  expect(attempt).toThrow('It should contain unique items')
})
