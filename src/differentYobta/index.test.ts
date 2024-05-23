/* eslint-disable import/extensions */
import { numberYobta } from '../numberYobta'
import { shapeYobta } from '../shapeYobta'
import { yobta } from '../yobta'
import { differentMessage, differentYobta } from './'

const customMessage = (): string => 'yobta!'

describe('differentYobta', () => {
  it('accepts when different', () => {
    const validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [differentYobta(['a'])],
      }),
    )
    const result = validate({ a: 1, b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })
  it('regects when not different', () => {
    const validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [differentYobta(['a'], customMessage)],
      }),
    )
    const attempt = (): any => validate({ a: 1, b: 1 })
    expect(attempt).toThrow('yobta!')
  })
  it('has default error mesage', () => {
    const validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [differentYobta(['a'])],
      }),
    )
    const attempt = (): any => validate({ a: 1, b: 1 })
    expect(attempt).toThrow(differentMessage(['a']))
  })
})
