/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { stringMessage, stringYobta } from './'

const customMessage = 'yobta!'
const validate = yobta(stringYobta(customMessage))

it('accepts strings', () => {
  const result = validate('yobta')
  expect(result).toBe('yobta')
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBe('')
})

it('coerces number', () => {
  const result = validate(1)
  expect(result).toBe('1')
})

it('coerces booelan', () => {
  const result = validate(true)
  expect(result).toBe('true')
})

it('coerces string object', () => {
  // eslint-disable-next-line no-new-wrappers
  const result = validate(new String('yobta'))
  expect(result).toBe('yobta')
})

it('rejects invalid', () => {
  const variants = [
    null,
    [],
    {},
    new Date(),
    Symbol('y'),
    new Set(),
    new Map(),
    () => 'yobta',
  ]
  variants.forEach(variant => {
    const attempt = (): any => validate(variant)
    expect(attempt).toThrow(customMessage)
  })
})

it('has default error message', () => {
  const rule = stringYobta()
  const validateDefault = yobta(rule)
  const attempt = (): any => validateDefault([])
  expect(attempt).toThrow(stringMessage)
})
