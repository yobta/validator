/* eslint-disable import/extensions */
import { number } from '.'
import { createValidator } from '../createValidator/createValidator'
import { optional } from '../optional/optional'
import { minNumber, minNumberMessage } from './minNumber'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(
  number(),
  minNumber(() => 1, customMessage),
)

it('accepts exact lenght', () => {
  const result = validate(1)
  expect(result).toBe(1)
})

it('accepts greater lenght', () => {
  const result = validate(2)
  expect(result).toBe(2)
})

it('regects insufficient lenght', () => {
  const assign = (): any => validate(0)
  expect(assign).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = createValidator(
    number(),
    minNumber(() => 1),
  )
  const assign = (): any => validateDefault(0)
  expect(assign).toThrow(minNumberMessage(1))
})

it('accepts when undefined', () => {
  const validateUndefined = createValidator(
    number(),
    optional(),
    minNumber(() => 1),
  )
  const result1 = validateUndefined(undefined)
  expect(result1).toBeUndefined()

  const result2 = validateUndefined(1)
  expect(result2).toBe(1)
})
