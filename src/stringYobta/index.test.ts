/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { stringMessage, stringYobta } from './'

const customMessage = 'yobta!'
const validate = yobta(stringYobta(customMessage))

describe('stringYobta', () => {
  it('accepts strings', () => {
    let result = validate('yobta')
    expect(result).toBe('yobta')
  })

  it('accepts undefined', () => {
    let result = validate(undefined)
    expect(result).toBe('')
  })

  it('coerces null', () => {
    let result = validate(null)
    expect(result).toBe('')
  })

  it('coerces number', () => {
    let result = validate(1)
    expect(result).toBe('1')
  })

  it('coerces booelan', () => {
    let result = validate(true)
    expect(result).toBe('true')
  })

  it('coerces string object', () => {
    // eslint-disable-next-line no-new-wrappers
    let result = validate(new String('yobta'))
    expect(result).toBe('yobta')
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
      expect(attempt).toThrow(customMessage)
    })
  })

  it('has default error message', () => {
    let rule = stringYobta()
    let validateDefault = yobta(rule)
    let attempt = (): any => validateDefault([])
    expect(attempt).toThrow(stringMessage)
  })
})
