/* eslint-disable import/extensions */
import { numberYobta } from '../numberYobta'
import { shapeYobta } from '../shapeYobta'
import { yobta } from '../yobta'
import { identicalMessage, identicalYobta } from './'

const customMessage = (): string => 'yobta!'

describe('identicalYobta', () => {
  it('accepts when identical', () => {
    const validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [identicalYobta(['a'])],
      }),
    )
    const result = validate({ a: 1, b: 1 })
    expect(result).toEqual({ a: 1, b: 1 })
  })

  it('rejects when not identical', () => {
    const validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [identicalYobta(['a'], customMessage)],
      }),
    )
    const attempt = (): any => validate({ a: '2', b: 1 })
    expect(attempt).toThrow('yobta!')
  })

  it('has default error mesage', () => {
    const validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [identicalYobta(['a'])],
      }),
    )
    const attempt = (): any => validate({ a: '1', b: 1 })
    expect(attempt).toThrow(identicalMessage(['a']))
  })
})
