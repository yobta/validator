/* eslint-disable import/extensions */
import { constYobta, constMessage } from '.'
import { yobta } from '../yobta'
import { shapeYobta } from '../shapeYobta'

describe('identicalYobta', () => {
  it('accepts when identical', () => {
    let validate = yobta(
      shapeYobta({
        a: [constYobta('a')],
      }),
    )
    let result = validate({ a: 'a' })
    expect(result).toEqual({ a: 'a' })
  })

  it('rejects when not identical', () => {
    let validate = yobta(
      shapeYobta({
        a: [constYobta('b', 'yobta')],
      }),
    )
    let attempt = (): any => validate({ a: 'a' })
    expect(attempt).toThrow('yobta')
  })

  it('has default error mesage', () => {
    let validate = yobta(
      shapeYobta({
        a: [constYobta('b')],
      }),
    )
    let attempt = (): any => validate({ a: 'a' })
    expect(attempt).toThrow(constMessage('b'))
  })
})
