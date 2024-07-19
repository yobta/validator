/* eslint-disable import/extensions */
import { arrayYobta } from '../arrayYobta'
import { requiredYobta } from '../requiredYobta'
import { yobta } from '../yobta'
import { uniqueYobta } from './'

const customMesage = 'yobta'

const validate = yobta(arrayYobta(), requiredYobta(), uniqueYobta(customMesage))

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
  const validateDefault = yobta(arrayYobta(), requiredYobta(), uniqueYobta())
  const attempt = (): any => validateDefault(['', '2', '2'])
  expect(attempt).toThrow('It should contain unique items')
})
