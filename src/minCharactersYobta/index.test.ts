/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { minCharactersMessage, minCharactersYobta } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(minCharactersYobta(1, customMessage))

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
  const validateDefault = yobta(minCharactersYobta(1))
  const attempt = (): any => validateDefault('')
  expect(attempt).toThrow(minCharactersMessage(1))
})
