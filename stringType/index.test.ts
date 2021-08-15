import { createSyncValidator } from '../createSyncValidator/index.js'
import { stringType, stringTypeMessage } from './index.js'

const customMessage = 'yobta!'
const stringRule = stringType(customMessage)
const validate = createSyncValidator(stringRule)

it('accepts strings', () => {
  let result = validate('yobta')
  expect(result).toEqual(['yobta', null])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('coerces null', () => {
  let result = validate(null)
  expect(result).toEqual(['', null])
})

it('coerces number', () => {
  let result = validate(1)
  expect(result).toEqual(['1', null])
})

it('coerces booelan', () => {
  let result = validate(true)
  expect(result).toEqual(['true', null])
})

it('coerces string object', () => {
  // eslint-disable-next-line no-new-wrappers
  let result = validate(new String('yobta'))
  expect(result).toEqual(['yobta', null])
})

it('rejects invalid', () => {
  ;[
    [],
    {},
    new Date(),
    Symbol('y'),
    new Set(),
    new Map(),
    () => 'yobta'
  ].forEach(variant => {
    let result = validate(variant)
    expect(result).toEqual([
      null,
      [{ field: '@root', message: customMessage, path: [] }]
    ])
  })
})

it('has default error message', () => {
  let defaultString = stringType()
  let validateDefault = createSyncValidator(defaultString)
  let result = validateDefault([])
  expect(result).toEqual([
    null,
    [{ field: '@root', message: stringTypeMessage, path: [] }]
  ])
})
