/* eslint-disable import/extensions */
import { stringYobta } from '../stringYobta'
import { createValidator } from '../createValidator/createValidator'
import { requiredMessage, requiredYobta } from './'

const customMessage = 'yobta!'
const validate = createValidator(requiredYobta(customMessage), stringYobta())

it('accepts value', () => {
  const result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects undefined', () => {
  const attempt = (): any => validate(undefined)
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  const validateDefault = createValidator(requiredYobta(), stringYobta())
  const attempt = (): any => validateDefault(undefined)
  expect(attempt).toThrow(requiredMessage)
})
