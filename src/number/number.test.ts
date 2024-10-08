/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { YobtaError } from '../YobtaError'
import { number, numberMessage } from './number'

const customMessage = 'yobta!'
const validate = createValidator(number(customMessage))

it('accepts numbers', () => {
  const result = validate(1)
  expect(result).toBe(1)
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

it('casts empty string to undefined', () => {
  const result = validate('')
  expect(result).toBeUndefined()
})

it('casts null', () => {
  const result = validate(null)
  expect(result).toBe(0)
})

it('casts string', () => {
  const result = validate('1')
  expect(result).toBe(1)
})

it('casts empty string', () => {
  const result = validate('')
  expect(result).toBeUndefined()
})

it('casts empty array', () => {
  const result = validate([])
  expect(result).toBe(0)
})

it('casts booelan', () => {
  const result = validate(true)
  expect(result).toBe(1)
})

it('casts date', () => {
  const date = new Date(1)
  const result = validate(date)
  expect(result).toBe(1)
})

it('has default error message', () => {
  const validateDefault = createValidator(number())
  const attempt = (): any => validateDefault({})
  expect(attempt).toThrow(numberMessage)
})

const invalidVariants = [
  NaN,
  Infinity,
  {},
  '1 23',
  Symbol('y'),
  new Set(),
  new Map(),
  'yobta',
  () => 'yobta',
]
invalidVariants.forEach((variant, index) => {
  it(`rejects: ${index}: ${String(variant)}`, () => {
    const attempt = (): any => validate(variant)
    const error = new YobtaError({
      field: '@',
      message: customMessage,
      path: [],
    })
    expect(attempt).toThrow(error)
  })
})
