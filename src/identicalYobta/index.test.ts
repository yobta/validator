/* eslint-disable import/extensions */
import { identicalYobta, identicalMessage } from './'
import { yobta } from '../yobta'
import { shapeYobta } from '../shapeYobta'
import { numberYobta } from '../numberYobta'

const customMessage = (): string => 'yobta!'

describe('identicalYobta', () => {
  it('accepts when identical', () => {
    let validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [identicalYobta(['a'])],
      }),
    )
    let result = validate({ a: 1, b: 1 })
    expect(result).toEqual({ a: 1, b: 1 })
  })

  it('rejects when not identical', () => {
    let validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [identicalYobta(['a'], customMessage)],
      }),
    )
    let attempt = (): any => validate({ a: '2', b: 1 })
    expect(attempt).toThrow('yobta!')
  })

  it('has default error mesage', () => {
    let validate = yobta(
      shapeYobta({
        a: [numberYobta()],
        b: [identicalYobta(['a'])],
      }),
    )
    let attempt = (): any => validate({ a: '1', b: 1 })
    expect(attempt).toThrow(identicalMessage(['a']))
  })
})
