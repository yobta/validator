/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { optional } from '../optional/optional'
import { integer, integerMessage } from './integer'
import { number } from './number'

const customMessage = 'yobta!'
const validate = createValidator(integer(customMessage))

it('accepts integers', () => {
  const result = validate(1)
  expect(result).toEqual(1)
})

it('rejects floats', () => {
  const attempt = (): any => validate(2.2)
  expect(attempt).toThrow(customMessage)
})

it('rejects NaN', () => {
  const attempt = (): any => validate(NaN)
  expect(attempt).toThrow(customMessage)
})

it('rejects Infinity', () => {
  const attempt = (): any => validate(Infinity)
  expect(attempt).toThrow(customMessage)
})

it('returns undefined for undefined', () => {
  const validateUndefined = createValidator(number(), optional(), integer())
  const result = validateUndefined(undefined)
  expect(result).toBeUndefined()
})

it('has default error message', () => {
  const validateDefault = createValidator(integer())
  const attempt = (): any => validateDefault(0.1)
  expect(attempt).toThrow(integerMessage)
})
