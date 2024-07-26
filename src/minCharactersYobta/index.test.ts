/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { string } from '../string'
import { minCharactersMessage, minCharactersYobta } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(string(), minCharactersYobta(1, customMessage))

it('accepts exact lenght', () => {
  const result = validate('a')
  expect(result).toBe('a')
})

it('accepts greater lenght', () => {
  const result = validate('ab')
  expect(result).toBe('ab')
})

it('regects insufficient lenght', () => {
  const attempt = (): any => validate('')
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = createValidator(string(), minCharactersYobta(1))
  const attempt = (): any => validateDefault('')
  expect(attempt).toThrow(minCharactersMessage(1))
})
