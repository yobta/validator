import { jest } from '@jest/globals'

import { syncYobta } from '../syncYobta'
import { stringYobta, stringMessage } from '../stringYobta'
import { shapeYobta, shapeMessage } from './'
import { requiredYobta } from '../requiredYobta'
import { YobtaContext } from '../YobtaContext'

const validate = syncYobta(
  shapeYobta({
    name: [stringYobta(), requiredYobta<string>()]
  })
)

it('accepts valid shapes', () => {
  let result = validate({
    name: 'yobta'
  })
  expect(result).toEqual({ name: 'yobta' })
})

it('accepts valid shapes with overload', () => {
  let result = validate({
    name: 'yobta',
    age: 0
  })
  expect(result).toEqual({ name: 'yobta', age: 0 })
})

it('rejects invalid input', () => {
  let attempt = (): any => validate([])
  expect(attempt).toThrow(shapeMessage)
})

it('can be undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('has custom error messages', () => {
  let attempt = (): any =>
    syncYobta(
      shapeYobta(
        {
          name: [stringYobta()]
        },
        'yobta!'
      )
    )([])
  expect(attempt).toThrow('yobta!')
})

it('captures errors from field validators', () => {
  let attempt = (): any =>
    validate({
      name: []
    })
  expect(attempt).toThrow(stringMessage)
})

it('returns errors for invalid keys', () => {
  let pushError = jest.fn()
  let validateCustom = shapeYobta({
    name: [stringYobta()]
  })
  let context: YobtaContext = {
    path: [],
    field: '',
    pushError,
    data: '',
    errors: []
  }
  let result = validateCustom(context)({
    name: {}
  })
  expect(result).toEqual({ name: {} })
  expect(pushError).toHaveBeenCalledWith(new Error('It should be a string'))
})
