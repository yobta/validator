/* eslint-disable import/extensions */
import { integerYobta, integerMessage } from './'
import { yobta } from '../yobta'

const customMessage = 'yobta!'
const validate = yobta(integerYobta(customMessage))

describe('integerYobta', () => {
  it('accepts integers', () => {
    let result = validate(1)
    expect(result).toEqual(1)
  })

  it('rejects undefined', () => {
    let attempt = (): any => validate(undefined)
    expect(attempt).toThrow(customMessage)
  })

  it('rejects floats', () => {
    let attempt = (): any => validate(2.2)
    expect(attempt).toThrow(customMessage)
  })

  it('rejects NaN', () => {
    let attempt = (): any => validate(NaN)
    expect(attempt).toThrow(customMessage)
  })

  it('rejects Infinity', () => {
    let attempt = (): any => validate(Infinity)
    expect(attempt).toThrow(customMessage)
  })

  it('has default error message', () => {
    let validateDefault = yobta(integerYobta())
    let attempt = (): any => validateDefault(0.1)
    expect(attempt).toThrow(integerMessage)
  })
})
