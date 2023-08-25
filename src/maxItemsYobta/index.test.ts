/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { maxItemsMessage, maxItemsYobta } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(maxItemsYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate([1])
  expect(result).toEqual([1])
})

it('accepts smaller lenght', () => {
  let result = validate([])
  expect(result).toEqual([])
})

it('regects greater lenght', () => {
  let assign = (): any => validate([1, 2])
  expect(assign).toThrow(customMessage(1))
})

it('has default error message', () => {
  let validateDefault = yobta(maxItemsYobta(1))
  let assign = (): any => validateDefault([1, 2])
  expect(assign).toThrow(maxItemsMessage(1))
})
