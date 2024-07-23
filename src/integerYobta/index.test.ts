/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { integerMessage, integerYobta } from './'

const customMessage = 'yobta!'
const validate = createValidator(integerYobta(customMessage))

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

it('rejects undefined', () => {
  const attempt = (): any => validate(undefined)
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  const validateDefault = createValidator(integerYobta())
  const attempt = (): any => validateDefault(0.1)
  expect(attempt).toThrow(integerMessage)
})
