/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { shape } from '../shape/shape'
import { constant, constantMessage } from './constant'

it('accepts when identical', () => {
  const validate = createValidator(
    shape({
      a: constant('a'),
    }),
  )
  const result = validate({ a: 'a' })
  expect(result).toEqual({ a: 'a' })
})

it('rejects when not identical', () => {
  const validate = createValidator(
    shape({
      a: constant('b', 'yobta'),
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow('yobta')
})

it('rejects when not undefined', () => {
  const validate = createValidator(
    shape({
      a: constant('b', 'yobta'),
    }),
  )
  const attempt = (): any => validate({})
  expect(attempt).toThrow('yobta')
})

it('has default error mesage', () => {
  const validate = createValidator(
    shape({
      a: constant('b'),
    }),
  )
  const attempt = (): any => validate({ a: 'a' })
  expect(attempt).toThrow(constantMessage('b'))
})
