import { jest } from '@jest/globals'

import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { itemsYobta } from '.'
import { requiredYobta } from '../requiredYobta'
import { minCharactersYobta } from '../minCharactersYobta'
import { arrayYobta } from '../arrayYobta'
import { YobtaContext } from '../_internal/YobtaContext'

const validate = yobta(
  arrayYobta(),
  requiredYobta(),
  itemsYobta(stringYobta(), requiredYobta(), minCharactersYobta(5))
)

it('accepts empty array', () => {
  let result = validate([])
  expect(result).toEqual([])
})

it('accepts array of strings', () => {
  let result = validate(['yobta'])
  expect(result).toEqual(['yobta'])
})

it('rejects empty array', () => {
  let result = (): any => validate([[]])
  expect(result).toThrow('It should be a string')
})

it('rejects array with empty string', () => {
  let result = (): any => validate([['']])
  expect(result).toThrow('It should be a string')
})

it('rejects array with invalid item', () => {
  let result = (): any => validate([['yobt']])
  expect(result).toThrow('It should be a string')
})

it('returns original item when gets an error', () => {
  let pushError = jest.fn()
  let customValidate = itemsYobta(stringYobta())
  let context: YobtaContext = {
    path: [],
    field: '',
    pushError,
    data: '',
    errors: []
  }
  let result = customValidate(context)([{}])
  expect(result).toEqual([{}])
  expect(pushError).toHaveBeenCalledWith(new Error('It should be a string'))
})
