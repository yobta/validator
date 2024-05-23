/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { YobtaError } from '../YobtaError'
import { numberMessage, numberYobta } from './'

const customMessage = 'yobta!'
const validate = yobta(numberYobta(customMessage))

describe('numberYobta', () => {
  it('accepts numbers', () => {
    const result = validate(1)
    expect(result).toBe(1)
  })

  it('accepts undefined', () => {
    const result = validate(undefined)
    expect(result).toBeUndefined()
  })

  it('rejects NaN', () => {
    const attempt = (): number | undefined => validate(NaN)
    const error = new YobtaError({
      field: '@',
      message: customMessage,
      path: [],
    })
    expect(attempt).toThrow(error)
  })

  it('coerces null', () => {
    const result = validate(null)
    expect(result).toBe(0)
  })

  it('rejects Infinity', () => {
    const attempt = (): number | undefined => validate(Infinity)
    const error = new YobtaError({
      field: '@',
      message: customMessage,
      path: [],
    })
    expect(attempt).toThrow(error)
  })

  it('rejects Infinity string', () => {
    const attempt = (): number | undefined => validate('Infinity')
    const error = new YobtaError({
      field: '@',
      message: customMessage,
      path: [],
    })
    expect(attempt).toThrow(error)
  })

  it('coerces string', () => {
    const result = validate('1')
    expect(result).toBe(1)
  })

  it('takes empty string as undefined', () => {
    const result = validate('')
    expect(result).toBeUndefined()
  })

  it('strips whitespace', () => {
    const result = validate('1 23')
    expect(result).toBe(123)
  })

  it('coerces booelan', () => {
    const result = validate(true)
    expect(result).toBe(1)
  })

  it('rejects invalid', () => {
    const variants = [
      [],
      {},
      new Date(),
      Symbol('y'),
      new Set(),
      new Map(),
      'yobta',
      () => 'yobta',
    ]
    variants.forEach(variant => {
      const attempt = (): any => validate(variant)
      const error = new YobtaError({
        field: '@',
        message: customMessage,
        path: [],
      })
      expect(attempt).toThrow(error)
    })
  })

  it('has default error message', () => {
    const validateDefault = yobta(numberYobta())
    const attempt = (): any => validateDefault([])
    expect(attempt).toThrow(numberMessage)
  })
})
