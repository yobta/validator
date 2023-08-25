/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { minCharactersMessage, minCharactersYobta } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(minCharactersYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate('a')
  expect(result).toBe('a')
})

it('accepts greater lenght', () => {
  let result = validate('ab')
  expect(result).toBe('ab')
})

it('regects insufficient lenght', () => {
  let attempt = (): any => validate('')
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  let validateDefault = yobta(minCharactersYobta(1))
  let attempt = (): any => validateDefault('')
  expect(attempt).toThrow(minCharactersMessage(1))
})
