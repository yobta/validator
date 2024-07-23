/* eslint-disable import/extensions */
import { constMessage, constYobta } from '.'
import { createValidator } from '../createValidator/createValidator'
import { shapeYobta } from '../shapeYobta'

it('accepts when identical', () => {
  const validate = createValidator(
    shapeYobta({
      a: constYobta('a'),
    }),
  )
  const result = validate({ a: 'a' })
  expect(result).toEqual({ a: 'a' })
})

it('rejects when not identical', () => {
  const validate = createValidator(
    shapeYobta({
      a: constYobta('b', 'yobta'),
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow('yobta')
})

it('rejects when not undefined', () => {
  const validate = createValidator(
    shapeYobta({
      a: constYobta('b', 'yobta'),
    }),
  )
  const attempt = (): any => validate({})
  expect(attempt).toThrow('yobta')
})

it('has default error mesage', () => {
  const validate = createValidator(
    shapeYobta({
      a: constYobta('b'),
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow(constMessage('b'))
})
