/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { maxItemsMessage, maxItemsYobta } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(maxItemsYobta(1, customMessage))

it('accepts exact lenght', () => {
  const result = validate([1])
  expect(result).toEqual([1])
})

it('accepts smaller lenght', () => {
  const result = validate([])
  expect(result).toEqual([])
})

it('regects greater lenght', () => {
  const assign = (): any => validate([1, 2])
  expect(assign).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = createValidator(maxItemsYobta(1))
  const assign = (): any => validateDefault([1, 2])
  expect(assign).toThrow(maxItemsMessage(1))
})
