import { syncYobta } from '../syncYobta'
import { shapeYobta } from '../shapeYobta'
import { numberYobta } from '../numberYobta'
import { differentYobta, differentMessage } from '.'
import { YobtaError } from '../YobtaError'

const customMessage = (): string => 'yobta!'

it('accepts when different', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [differentYobta(['a'])]
    })
  )
  let result = validate({ a: 1, b: 2 })
  expect(result).toEqual([{ a: 1, b: 2 }, null])
})

it('regects when not different', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [differentYobta(['a'], customMessage)]
    })
  )
  let result = validate({ a: 1, b: 1 })
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'b',
        message: 'yobta!',
        path: ['b']
      })
    ]
  ])
})

it('has default error mesage', () => {
  let validate = syncYobta(
    shapeYobta({
      a: [numberYobta()],
      b: [differentYobta(['a'])]
    })
  )
  let result = validate({ a: 1, b: 1 })
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'b',
        message: differentMessage(['a']),
        path: ['b']
      })
    ]
  ])
})
