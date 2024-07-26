/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { string } from '../string'
import { requiredMessage, requiredYobta } from './'

const customMessage = 'yobta!'
const validate = createValidator(requiredYobta(customMessage), string())

it('accepts value', () => {
  const result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects undefined', () => {
  const attempt = (): any => validate(undefined)
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  const validateDefault = createValidator(requiredYobta(), string())
  const attempt = (): any => validateDefault(undefined)
  expect(attempt).toThrow(requiredMessage)
})
