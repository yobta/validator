/* eslint-disable import/extensions */
import { maxItemsYobta, maxItemsMessage } from './'
import { yobta } from '../yobta'

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

it('accepts error message as a string', () => {
  let validateDefault = yobta(maxItemsYobta(1, 'maxItemsYobta error test'))
  let assign = (): any => validateDefault([1, 2])
  expect(assign).toThrow('maxItemsYobta error test')
})
