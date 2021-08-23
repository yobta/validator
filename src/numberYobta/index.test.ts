import { syncYobta } from '../syncYobta'
import { YobtaError } from '../YobtaError'
import { numberYobta, numberMessage } from './'

const customMessage = 'yobta!'
const validate = syncYobta(numberYobta(customMessage))

it('accepts numbers', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('coerces null', () => {
  let result = validate(null)
  expect(result).toEqual([0, null])
})

it('coerces string', () => {
  let result = validate('1')
  expect(result).toEqual([1, null])
})

it('coerces booelan', () => {
  let result = validate(true)
  expect(result).toEqual([1, null])
})

it('rejects invalid', () => {
  let variants = [
    NaN,
    Infinity,
    [],
    {},
    new Date(),
    Symbol('y'),
    new Set(),
    new Map(),
    () => 'yobta'
  ]
  variants.forEach(variant => {
    let result = validate(variant)
    expect(result).toEqual([
      null,
      [new YobtaError({ field: '@root', message: customMessage, path: [] })]
    ])
  })
})

it('has default error message', () => {
  let validateDefault = syncYobta(numberYobta())
  let result = validateDefault([])
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: numberMessage, path: [] })]
  ])
})
