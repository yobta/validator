/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { numberYobta } from '../numberYobta'
import { shapeYobta } from '../shapeYobta'
import { identicalMessage, identicalYobta } from './'

const customMessage = (): string => 'yobta!'

it('accepts when identical', () => {
  const validate = createValidator(
    shapeYobta({
      a: numberYobta(),
      b: identicalYobta(['a']),
    }),
  )
  const result = validate({ a: 1, b: 1 })
  expect(result).toEqual({ a: 1, b: 1 })
})

it('rejects when not identical', () => {
  const validate = createValidator(
    shapeYobta({
      a: numberYobta(),
      b: identicalYobta(['a'], customMessage),
    }),
  )
  const attempt = (): any => validate({ a: '2', b: 1 })
  expect(attempt).toThrow('yobta!')
})

it('has default error mesage', () => {
  const validate = createValidator(
    shapeYobta({
      a: numberYobta(),
      b: identicalYobta(['a']),
    }),
  )
  const attempt = (): any => validate({ a: '1', b: 1 })
  expect(attempt).toThrow(identicalMessage(['a']))
})
