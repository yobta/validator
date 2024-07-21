/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { enumMessage, enumYobta } from './'

const customMessage = (): string => 'yobta!'
const validate = yobta(enumYobta(new Set(['yobta']), customMessage))

it('accepts listed', () => {
  const result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects undefined', () => {
  const result = (): any => validate(undefined)
  expect(result).toThrow(customMessage())
})

it('rejects not listed', () => {
  const result = (): any => validate(null)
  expect(result).toThrow(customMessage())
})

it('has default error message', () => {
  const set = new Set<['yobta']>()
  const rule = enumYobta(set)
  const validateDefault = yobta(rule)
  const attempt = (): any => validateDefault(0)
  expect(attempt).toThrow(enumMessage(set))
})
