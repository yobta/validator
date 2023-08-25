/* eslint-disable import/extensions */
import { enumYobta, enumMessage } from './'
import { yobta } from '../yobta'

const customMessage = (): string => 'yobta!'
const validate = yobta(enumYobta(['yobta'], customMessage))

it('accepts listed', () => {
  let result = validate('yobta')
  expect(result).toBe('yobta')
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects not listed', () => {
  let result = (): string | undefined => validate(null)
  expect(result).toThrow(customMessage())
})

it('has default error message', () => {
  let rule = enumYobta(['yobta'])
  let validateDefault = yobta(rule)
  let attempt = (): string | undefined => validateDefault(0)
  expect(attempt).toThrow(enumMessage(['yobta']))
})

it('accepts error message as a string', () => {
  let rule = enumYobta(['yobta'], 'Enum error message test')
  let validateDefault = yobta(rule)
  let attempt = (): string | undefined => validateDefault(0)
  expect(attempt).toThrow('Enum error message test')
})
