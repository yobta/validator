/* eslint-disable import/extensions */
import { numberYobta } from '../numberYobta'
import { shapeYobta } from '../shapeYobta'
import { createValidator } from '../createValidator/createValidator'
import { identicalMessage, identicalYobta } from './'

const customMessage = (): string => 'yobta!'

describe('identicalYobta', () => {
  it('accepts when identical', () => {
    const validate = createValidator(
      shapeYobta({
        a: createValidator(numberYobta()),
        b: createValidator(identicalYobta(['a'])),
      }),
    )
    const result = validate({ a: 1, b: 1 })
    expect(result).toEqual({ a: 1, b: 1 })
  })

  it('rejects when not identical', () => {
    const validate = createValidator(
      shapeYobta({
        a: createValidator(numberYobta()),
        b: createValidator(identicalYobta(['a'], customMessage)),
      }),
    )
    const attempt = (): any => validate({ a: '2', b: 1 })
    expect(attempt).toThrow('yobta!')
  })

  it('has default error mesage', () => {
    const validate = createValidator(
      shapeYobta({
        a: createValidator(numberYobta()),
        b: createValidator(identicalYobta(['a'])),
      }),
    )
    const attempt = (): any => validate({ a: '1', b: 1 })
    expect(attempt).toThrow(identicalMessage(['a']))
  })
})
