import { jest } from '@jest/globals'

import { asyncYobta } from '../asyncYobta'
import { stringYobta, stringMessage } from '../stringYobta'
import { asyncShapeYobta, asyncShapeMessage } from '.'
import { requiredYobta } from '../requiredYobta'
import { YobtaContext } from '../YobtaContext'

const validate = asyncYobta(
  asyncShapeYobta({
    name: [stringYobta(), requiredYobta<string>()]
  })
)

it('accepts valid shapes', async () => {
  let result = await validate({
    name: 'yobta'
  })
  expect(result).toEqual([{ name: 'yobta' }, null])
})

it('accepts valid shapes with overload', async () => {
  let result = await validate({
    name: 'yobta',
    age: 0
  })
  expect(result).toEqual([{ age: 0, name: 'yobta' }, null])
})

it('rejects invalid input', async () => {
  let attempt = async (): Promise<any> => await validate([])
  let result = await attempt()
  expect(result).toEqual([
    null,
    [
      {
        field: '@',
        message: asyncShapeMessage,
        name: 'Error',
        path: []
      }
    ]
  ])
})

it('can be undefined', async () => {
  let result = await validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('has custom error messages', async () => {
  let attempt = (): any =>
    asyncYobta(
      asyncShapeYobta(
        {
          name: [stringYobta()]
        },
        'yobta!'
      )
    )([])
  let result = await attempt()
  expect(result).toEqual([
    null,
    [{ field: '@', message: 'yobta!', name: 'Error', path: [] }]
  ])
})

it('captures errors from field validators', async () => {
  let attempt = (): any =>
    validate({
      name: []
    })
  let result = await attempt()

  expect(result).toEqual([null, [new Error(stringMessage)]])
})

it('returns errors for invalid keys', async () => {
  let pushError = jest.fn()
  let validateCustom = asyncShapeYobta({
    name: [stringYobta()]
  })
  let context: YobtaContext = {
    path: [],
    field: '',
    pushError,
    data: '',
    errors: []
  }
  let result = await validateCustom(context)({
    name: {}
  })
  expect(result).toEqual({ name: {} })
  expect(pushError).toHaveBeenCalledWith(new Error(stringMessage))
})
