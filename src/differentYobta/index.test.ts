/* eslint-disable import/extensions */
import { numberYobta } from '../numberYobta'
import { shapeYobta } from '../shapeYobta'
import { createValidator } from '../createValidator/createValidator'
import { differentMessage, differentYobta } from './'

const customMessage = (): string => 'yobta!'

it('accepts when different', () => {
  const validate = createValidator(
    shapeYobta({
      a: createValidator(numberYobta()),
      b: createValidator(differentYobta(['a'])),
    }),
  )
  const result = validate({ a: 1, b: 2 })
  expect(result).toEqual({ a: 1, b: 2 })
})

it('accepts when different and undefined', () => {
  const validate = createValidator(
    shapeYobta({
      a: createValidator(numberYobta()),
      b: createValidator(differentYobta(['a'])),
    }),
  )
  const result = validate({ a: 1 })
  expect(result).toEqual({ a: 1, b: undefined })
})

it('regects when not different', () => {
  const validate = createValidator(
    shapeYobta({
      a: createValidator(numberYobta()),
      b: createValidator(differentYobta(['a'], customMessage)),
    }),
  )
  const attempt = (): any => validate({ a: 1, b: 1 })
  expect(attempt).toThrow('yobta!')
})

it('has default error mesage', () => {
  const validate = createValidator(
    shapeYobta({
      a: createValidator(numberYobta()),
      b: createValidator(differentYobta(['a'])),
    }),
  )
  const attempt = (): any => validate({ a: 1, b: 1 })
  expect(attempt).toThrow(differentMessage(['a']))
})
