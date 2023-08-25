/* eslint-disable import/extensions */
import { minItemsYobta, minItemsMessage } from './'
import { yobta } from '../yobta'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(minItemsYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate([1])
  expect(result).toEqual([1])
})

it('accepts greater lenght', () => {
  let result = validate([1, 2])
  expect(result).toEqual([1, 2])
})

it('regects insufficient lenght', () => {
  let attempt = (): any => validate([])
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  let validateDefault = yobta(minItemsYobta(1))
  let attempt = (): any => validateDefault([])
  expect(attempt).toThrow(minItemsMessage(1))
})

it('accepts error message as a string', () => {
  let validateDefault = yobta(minItemsYobta(1, 'minItemsYobta error test'))
  let attempt = (): any => validateDefault([])
  expect(attempt).toThrow('minItemsYobta error test')
})
