import { syncYobta } from '../syncYobta'
import { arrayYobta, arrayMessage } from './'

const customMessage = 'yobta!'
const stringRule = arrayYobta(customMessage)
const validate = syncYobta(stringRule)

it('accepts array', () => {
  let result = validate(['yobta'])
  expect(result).toEqual(['yobta'])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
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
    let attempt = (): any => validate(variant)
    expect(attempt).toThrow(customMessage)
  })
})

it('has default error message', () => {
  let rule = arrayYobta()
  let validateDefault = syncYobta(rule)
  let attempt = (): any => validateDefault('yobta')
  expect(attempt).toThrow(arrayMessage)
})
