import { yobta } from '../yobta'
import { shapeYobta } from '../shapeYobta'
import { numberYobta } from '../numberYobta'
import { differentYobta, differentMessage } from '.'

const customMessage = (): string => 'yobta!'

it('accepts when different', () => {
  let validate = yobta(
    shapeYobta({
      a: [numberYobta()],
      b: [differentYobta(['a'])]
    })
  )
  let result = validate({ a: 1, b: 2 })
  expect(result).toEqual({ a: 1, b: 2 })
})

it('regects when not different', () => {
  let validate = yobta(
    shapeYobta({
      a: [numberYobta()],
      b: [differentYobta(['a'], customMessage)]
    })
  )
  let attempt = (): any => validate({ a: 1, b: 1 })
  expect(attempt).toThrow('yobta!')
})

it('has default error mesage', () => {
  let validate = yobta(
    shapeYobta({
      a: [numberYobta()],
      b: [differentYobta(['a'])]
    })
  )
  let attempt = (): any => validate({ a: 1, b: 1 })
  expect(attempt).toThrow(differentMessage(['a']))
})
