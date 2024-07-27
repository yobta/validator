/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { minCharacters } from '../string/minCharacters'
import { string } from '../string/string'
import { array } from './array'
import { items } from './items'

const validate = createValidator(
  array(),
  items(
    string(),
    minCharacters(() => 5),
  ),
)

it('accepts empty array', () => {
  const result = validate([])
  expect(result).toEqual([])
})

it('accepts array of strings', () => {
  const result = validate(['yobta'])
  expect(result).toEqual(['yobta'])
})

it('rejects empty array', () => {
  const result = (): any => validate([[]])
  expect(result).toThrow('It should be a string')
})

it('rejects array with empty string', () => {
  const result = (): any => validate([['']])
  expect(result).toThrow('It should be a string')
})

it('rejects array with invalid item', () => {
  const result = (): any => validate([['yobt']])
  expect(result).toThrow('It should be a string')
})
