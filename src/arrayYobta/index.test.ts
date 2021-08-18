import { syncYobta } from '../syncYobta'
import { arrayYobta, arrayMessage } from './'

const customMessage = 'yobta!'
const stringRule = arrayYobta(customMessage)
const validate = syncYobta(stringRule)

it('accepts array', () => {
  let result = validate(['yobta'])
  expect(result).toEqual([['yobta'], null])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('rejects non-arrays', () => {
  let variants = [
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
      [{ field: '@root', message: customMessage, path: [] }]
    ])
  })
})

it('has default error message', () => {
  let rule = arrayYobta()
  let validateDefault = syncYobta(rule)
  let result = validateDefault('yobta')
  expect(result).toEqual([
    null,
    [{ field: '@root', message: arrayMessage, path: [] }]
  ])
})
