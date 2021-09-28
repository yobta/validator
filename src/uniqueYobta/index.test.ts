import { yobta } from '../yobta'
import { requiredYobta } from '../requiredYobta'
import { arrayYobta } from '../arrayYobta'
import { uniqueYobta } from '.'

const customMesage = 'yobta'

const validate = yobta(arrayYobta(), requiredYobta(), uniqueYobta(customMesage))

it('accepts empty array', () => {
  let result = validate([])
  expect(result).toEqual([])
})

it('accepts array of strings', () => {
  let result = validate([1, 2, 3, '', ' '])
  expect(result).toEqual([1, 2, 3, '', ' '])
})

it('rejects duplicate items', () => {
  let attempt = (): any => validate([1, 2, 2])
  expect(attempt).toThrow('yobta')
})

it('has default error message', () => {
  let validateDefault = yobta(arrayYobta(), requiredYobta(), uniqueYobta())
  let attempt = (): any => validateDefault(['', '2', '2'])
  expect(attempt).toThrow('It should contain unique items')
})
