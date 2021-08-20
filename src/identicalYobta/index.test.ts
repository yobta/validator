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
  expect(result).toEqual([{ a: 1, b: 1 }, null])
})

it('regects when not identical', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [identicalYobta(['a'], customMessage)]
    })
  )
  let result = validate({ a: '1', b: 1 })
  expect(result).toEqual([
    null,
    [
      {
        field: 'b',
        message: 'yobta!',
        path: ['b']
      }
    ]
  ])
})

it('has default error mesage', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [identicalYobta(['a'])]
    })
  )
  let result = validate({ a: '1', b: 1 })
  expect(result).toEqual([
    null,
    [
      {
        field: 'b',
        message: identicalMessage(['a']),
        path: ['b']
      }
    ]
  ])
})
