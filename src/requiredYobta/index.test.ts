/* eslint-disable import/extensions */
import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { requiredMessage, requiredYobta } from './'

const customMessage = 'yobta!'
const validate = yobta(stringYobta(), requiredYobta(customMessage))

it('accepts value', () => {
  let result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects undefined', () => {
  let attempt = (): any => validate(undefined)
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  let validateDefault = yobta(stringYobta(), requiredYobta())
  let attempt = (): any => validateDefault(undefined)
  expect(attempt).toThrow(requiredMessage)
})
