/* eslint-disable import/extensions */
import { number } from '.'
import { createValidator } from '../createValidator/createValidator'
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
