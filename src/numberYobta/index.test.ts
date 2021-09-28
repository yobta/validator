import { yobta } from '../yobta'
import { numberYobta, numberMessage } from './'

const customMessage = 'yobta!'
const validate = yobta(numberYobta(customMessage))

it('accepts numbers', () => {
  let result = validate(1)
  expect(result).toBe(1)
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('coerces null', () => {
  let result = validate(null)
  expect(result).toBe(0)
})

it('coerces string', () => {
  let result = validate('1')
  expect(result).toBe(1)
})

it('coerces booelan', () => {
  let result = validate(true)
  expect(result).toBe(1)
})

it('rejects invalid', () => {
  let variants = [
    NaN,
    Infinity,
    [],
    {},
    new Date(),
    Symbol('y'),
    new Set(),
    new Map(),
    () => 'yobta'
  ]
  variants.forEach(variant => {
    let attempt = (): any => validate(variant)
    expect(attempt).toThrow(customMessage)
  })
})

it('has default error message', () => {
  let validateDefault = yobta(numberYobta())
  let attempt = (): any => validateDefault([])
  expect(attempt).toThrow(numberMessage)
})
