/* eslint-disable import/extensions */
import { numberYobta, numberMessage } from './'
import { yobta } from '../yobta'
import { YobtaError } from '../YobtaError'

const customMessage = 'yobta!'
const validate = yobta(numberYobta(customMessage))

describe('numberYobta', () => {
  it('accepts numbers', () => {
    let result = validate(1)
    expect(result).toBe(1)
  })

  it('accepts undefined', () => {
    let result = validate(undefined)
    expect(result).toBe(NaN)
  })

  it('rejects NaN', () => {
    let attempt = (): number => validate(NaN)
    let error = new YobtaError({
      message: customMessage,
      field: '@',
      path: [],
    })
    expect(attempt).toThrow(error)
  })

  it('coerces null', () => {
    let result = validate(null)
    expect(result).toBe(0)
  })

  it('rejects Infinity', () => {
    let attempt = (): number => validate(Infinity)
    let error = new YobtaError({
      message: customMessage,
      field: '@',
      path: [],
    })
    expect(attempt).toThrow(error)
  })

  it('rejects Infinity string', () => {
    let attempt = (): number => validate('Infinity')
    let error = new YobtaError({
      message: customMessage,
      field: '@',
      path: [],
    })
    expect(attempt).toThrow(error)
  })

  it('coerces string', () => {
    let result = validate('1')
    expect(result).toBe(1)
  })

  it('strips whitespace', () => {
    let result = validate('1 23')
    expect(result).toBe(123)
  })

  it('coerces booelan', () => {
    let result = validate(true)
    expect(result).toBe(1)
  })

  it('rejects invalid', () => {
    let variants = [
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
      let attempt = (): any => validate(variant)
      let error = new YobtaError({
        message: customMessage,
        field: '@',
        path: [],
      })
      expect(attempt).toThrow(error)
    })
  })

  it('has default error message', () => {
    let validateDefault = yobta(numberYobta())
    let attempt = (): any => validateDefault([])
    expect(attempt).toThrow(numberMessage)
  })
})
