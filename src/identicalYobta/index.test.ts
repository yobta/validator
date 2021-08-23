import { syncYobta } from '../syncYobta'
import { shapeYobta } from '../shapeYobta'
import { numberYobta } from '../numberYobta'
import { identicalYobta, identicalMessage } from '.'

const customMessage = (): string => 'yobta!'

it('accepts when identical', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [identicalYobta(['a'])]
    })
  )
  let result = validate({ a: 1, b: 1 })
  expect(result).toEqual({ a: 1, b: 1 })
})

it('regects when not identical', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [identicalYobta(['a'], customMessage)]
    })
  )
  let attempt = (): any => validate({ a: '1', b: 1 })
  expect(attempt).toThrow('yobta!')
})

it('has default error mesage', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [identicalYobta(['a'])]
    })
  )
  let attempt = (): any => validate({ a: '1', b: 1 })
  expect(attempt).toThrow(identicalMessage(['a']))
})
