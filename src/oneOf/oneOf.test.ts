/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { oneOf, oneOfMessage } from './oneOf'

const customMessage = (): string => 'yobta!'
const validate = createValidator(oneOf(() => new Set(['yobta']), customMessage))

it('accepts listed', () => {
  const result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects not listed', () => {
  const result = (): any => validate(null)
  expect(result).toThrow(customMessage())
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

it('casts empty string', () => {
  const result = validate('')
  expect(result).toBeUndefined()
})

it('has default error message', () => {
  const set = new Set<['yobta']>()
  const rule = oneOf(() => set)
  const validateDefault = createValidator(rule)
  const attempt = (): any => validateDefault(0)
  expect(attempt).toThrow(oneOfMessage(set))
})
