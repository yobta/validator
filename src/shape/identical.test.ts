/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { number } from '../number'
import { identical, identicalMessage } from './identical'
import { shape } from './shape'

const customMessage = (): string => 'yobta!'

it('accepts when identical', () => {
  const validate = createValidator(
    shape({
      a: number(),
      b: identical(['a']),
    }),
  )
  const result = validate({ a: 1, b: 1 })
  expect(result).toEqual({ a: 1, b: 1 })
})

it('rejects when not identical', () => {
  const validate = createValidator(
    shape({
      a: number(),
      b: identical(['a'], customMessage),
    }),
  )
  const attempt = (): any => validate({ a: '2', b: 1 })
  expect(attempt).toThrow('yobta!')
})

it('has default error mesage', () => {
  const validate = createValidator(
    shape({
      a: number(),
      b: identical(['a']),
    }),
  )
  const attempt = (): any => validate({ a: '1', b: 1 })
  expect(attempt).toThrow(identicalMessage('b', ['a']))
})
