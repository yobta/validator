/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { maximumYobta, maximumYobtaMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(maximumYobta(1, customMessage))

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

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
  const validateDefault = yobta(maximumYobta(1))
  const attempt = (): any => validateDefault(2)
  expect(attempt).toThrow(maximumYobtaMessage(1))
})
