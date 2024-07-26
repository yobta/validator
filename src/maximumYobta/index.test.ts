/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { numberYobta } from '../numberYobta'
import { maximumYobta, maximumYobtaMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(numberYobta(), maximumYobta(1, customMessage))

it('accepts exact number', () => {
  const result = validate(1)
  expect(result).toBe(1)
})

it('accepts smaller number', () => {
  const result = validate(0)
  expect(result).toBe(0)
})

it('regects greater number', () => {
  const attempt = (): any => validate(2)
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = createValidator(numberYobta(), maximumYobta(1))
  const attempt = (): any => validateDefault(2)
  expect(attempt).toThrow(maximumYobtaMessage(1))
})
