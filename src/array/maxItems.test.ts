/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { array } from './array'
import { maxItems, maxItemsMessage } from './maxItems'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(
  array(),
  maxItems(() => 1, customMessage),
)

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
  const validateDefault = createValidator(maxItems(() => 1))
  const assign = (): any => validateDefault([1, 2])
  expect(assign).toThrow(maxItemsMessage(1))
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})
