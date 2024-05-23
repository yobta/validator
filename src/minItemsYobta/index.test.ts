/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { minItemsMessage, minItemsYobta } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(minItemsYobta(1, customMessage))

it('accepts exact lenght', () => {
  const result = validate([1])
  expect(result).toEqual([1])
})

it('accepts greater lenght', () => {
  const result = validate([1, 2])
  expect(result).toEqual([1, 2])
})

it('regects insufficient lenght', () => {
  const attempt = (): any => validate([])
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = yobta(minItemsYobta(1))
  const attempt = (): any => validateDefault([])
  expect(attempt).toThrow(minItemsMessage(1))
})
