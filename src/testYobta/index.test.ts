/* eslint-disable import/extensions */

import { stringYobta } from '../stringYobta'
import { createValidator } from '../createValidator/createValidator'
import { testMessage, testYobta } from './'

const regExp = /fo*/

const customMessage = 'yobta!'
const validate = createValidator(
  stringYobta(),
  testYobta(regExp, customMessage),
)

it('accepts if mathed', () => {
  const result = validate('table football')
  expect(result).toBe('table football')
})

it('rejects undefined', () => {
  const attempt = (): any => validate(undefined)
  expect(attempt).toThrow(customMessage)
})

it('regects empty string', () => {
  const attempt = (): any => validate('')
  expect(attempt).toThrow(customMessage)
})

it('regects if not matched', () => {
  const attempt = (): any => validate('yobta')
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  const validateDefault = createValidator(stringYobta(), testYobta(regExp))
  const attempt = (): any => validateDefault('yobta')
  expect(attempt).toThrow(testMessage)
})
