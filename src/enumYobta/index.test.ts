/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { enumMessage, enumYobta } from './'

const customMessage = (): string => 'yobta!'
const validate = yobta(enumYobta(['yobta'], customMessage))

it('accepts listed', () => {
  const result = validate('yobta')
  expect(result).toBe('yobta')
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects not listed', () => {
  const result = (): string | undefined => validate(null)
  expect(result).toThrow(customMessage())
})

it('has default error message', () => {
  const rule = enumYobta(['yobta'])
  const validateDefault = yobta(rule)
  const attempt = (): string | undefined => validateDefault(0)
  expect(attempt).toThrow(enumMessage(['yobta']))
})
