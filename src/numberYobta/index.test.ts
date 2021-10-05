import { yobta } from '../yobta'
import { YobtaError } from '../_internal/YobtaError'
import { numberYobta, numberMessage } from './'

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

  it('accepts NaN', () => {
    let result = validate(NaN)
    expect(result).toBe(NaN)
  })

  it('coerces null', () => {
    let result = validate(null)
    expect(result).toBe(0)
  })

  it('coerces Infinity', () => {
    let result = validate(Infinity)
    expect(result).toBe(NaN)
  })

  it('coerces Infinity string', () => {
    let result = validate('Infinity')
    expect(result).toBe(NaN)
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
      [],
      {},
      new Date(),
      Symbol('y'),
      new Set(),
      new Map(),
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
