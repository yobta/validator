/* eslint-disable import/extensions */
import { constMessage, constYobta } from '.'
import { shapeYobta } from '../shapeYobta'
import { yobta } from '../yobta'

it('accepts when identical', () => {
  const validate = yobta(
    shapeYobta({
      a: yobta(constYobta('a')),
    }),
  )
  const result = validate({ a: 'a' })
  expect(result).toEqual({ a: 'a' })
})

it('rejects when not identical', () => {
  const validate = yobta(
    shapeYobta({
      a: yobta(constYobta('b', 'yobta')),
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow('yobta')
})

it('rejects when not undefined', () => {
  const validate = yobta(
    shapeYobta({
      a: yobta(constYobta('b', 'yobta')),
    }),
  )
  const attempt = (): any => validate({})
  expect(attempt).toThrow('yobta')
})

it('has default error mesage', () => {
  const validate = yobta(
    shapeYobta({
      a: yobta(constYobta('b')),
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow(constMessage('b'))
})
