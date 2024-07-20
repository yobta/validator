/* eslint-disable import/extensions */
import { constMessage, constYobta } from '.'
import { shapeYobta } from '../shapeYobta'
import { yobta } from '../yobta'

it('accepts when identical', () => {
  const validate = yobta(
    shapeYobta({
      a: [constYobta('a')],
    }),
  )
  const result = validate({ a: 'a' })
  expect(result).toEqual({ a: 'a' })
})

it('accepts when undefined', () => {
  const validate = yobta(
    shapeYobta({
      a: [constYobta('a')],
    }),
  )
  const result = validate({})
  expect(result).toEqual({ a: undefined })
})

it('rejects when not identical', () => {
  const validate = yobta(
    shapeYobta({
      a: [constYobta('b', 'yobta')],
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow('yobta')
})

it('has default error mesage', () => {
  const validate = yobta(
    shapeYobta({
      a: [constYobta('b')],
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow(constMessage('b'))
})
