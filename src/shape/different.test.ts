/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { number } from '../number'
import { shape } from '../shape/shape'
import { different, differentMessage } from './different'

const customMessage = (): string => 'yobta!'

it('accepts when different', () => {
  const validate = createValidator(
    shape({
      a: number(),
      b: different(() => ['a']),
    }),
  )
  const result = validate({ a: 1, b: 2 })
  expect(result).toEqual({ a: 1, b: 2 })
})

it('accepts when different and undefined', () => {
  const validate = createValidator(
    shape({
      a: number(),
      b: different(() => ['a']),
    }),
  )
  const result = validate({ a: 1 })
  expect(result).toEqual({ a: 1, b: undefined })
})

it('regects when not different', () => {
  const validate = createValidator(
    shape({
      a: number(),
      b: different(() => ['a'], customMessage),
    }),
  )
  const attempt = (): any => validate({ a: 1, b: 1 })
  expect(attempt).toThrow('yobta!')
})

it('has default error mesage', () => {
  const validate = createValidator(
    shape({
      a: number(),
      b: different(() => ['a']),
    }),
  )
  const attempt = (): any => validate({ a: 1, b: 1 })
  expect(attempt).toThrow(differentMessage('b', ['a']))
})
