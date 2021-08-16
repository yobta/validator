import { syncYobta } from '../syncYobta/index.js'
import { arrayYobta, arrayMessage } from './index.js'

const customMessage = 'yobta!'
const stringRule = arrayYobta(customMessage)
const validate = syncYobta(stringRule)

it('accepts strings', () => {
  let result = validate(['yobta'])
  expect(result).toEqual([['yobta'], null])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('rejects invalid', () => {
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
  let defaultString = arrayYobta()
  let validateDefault = syncYobta(defaultString)
  let result = validateDefault('yobta')
  expect(result).toEqual([
    null,
    [{ field: '@root', message: arrayMessage, path: [] }]
  ])
})
