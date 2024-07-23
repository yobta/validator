/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import {
  asyncYobta,
  defaultYobta,
  differentYobta,
  identicalYobta,
  requiredYobta,
  shapeYobta,
  stringMessage,
  stringYobta,
  yobta,
} from '..'
import { createContext } from '../_internal/createContext'
import { YobtaError } from '../YobtaError'
import { asyncShapeMessage, awaitShapeYobta } from './'

const validate = asyncYobta(
  awaitShapeYobta({
    age: asyncYobta(stringYobta()),
    name: asyncYobta(stringYobta()),
  }),
)

it('accepts valid shapes', async () => {
  const result = await validate({
    age: 1,
    name: 'yobta',
  })
  expect(result).toEqual([{ age: '1', name: 'yobta' }, null])
})

it('accepts valid shapes with overload', async () => {
  const result = await validate({
    age: 0,
    experience: 0,
    name: 'yobta',
  })
  expect(result).toEqual([{ age: '0', experience: 0, name: 'yobta' }, null])
})

it('rejects invalid input', async () => {
  const attempt = async (): Promise<any> => await validate([])
  const result = await attempt()
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: '@',
        message: asyncShapeMessage,
        path: [],
      }),
    ],
  ])
})

it('rejects invalid undefined input', async () => {
  const attempt = async (): Promise<any> => await validate(undefined)
  const result = await attempt()
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: '@',
        message: asyncShapeMessage,
        path: [],
      }),
    ],
  ])
})

it('has custom error messages', async () => {
  const attempt = (): any =>
    asyncYobta(
      awaitShapeYobta(
        {
          name: asyncYobta(requiredYobta()),
        },
        'yobta!',
      ),
    )([])
  const result = await attempt()
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: '@',
        message: 'yobta!',
        path: [],
      }),
    ],
  ])
})

it('captures errors from field validators', async () => {
  const attempt = (): any =>
    validate({
      name: [],
    })
  const result = await attempt()

  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'age',
        message: stringMessage,
        path: ['age'],
      }),
      new YobtaError({
        field: 'name',
        message: asyncShapeMessage,
        path: ['name'],
      }),
    ],
  ])
})

it('returns errors for invalid keys', async () => {
  const context = createContext({})
  // jest.spyOn(context, 'pushError')

  const attempt = (): any =>
    awaitShapeYobta({
      name: asyncYobta(stringYobta()),
    })(context)({
      name: {},
    })
  expect(attempt).rejects.toThrow(asyncShapeMessage)
  // expect(pushErrorMock).toHaveBeenCalledWith(new Error(stringMessage))
})

it('should replace context.data', async () => {
  const replaced = {
    newPassword: 'new yobta',
    password: 'old yobta',
    retypePassword: 'new yobta',
  }
  const attempt = asyncYobta(
    defaultYobta(replaced),
    shapeYobta({
      newPassword: yobta(differentYobta(['password'])),
      password: yobta(stringYobta()),
      retypePassword: yobta(identicalYobta(['newPassword'])),
    }),
  )
  const result = await attempt(undefined)
  expect(result).toEqual([replaced, null])
})

it('has no racing condition', async () => {
  const attempt = asyncYobta(
    awaitShapeYobta({
      address: asyncYobta(requiredYobta()),
      description: asyncYobta(requiredYobta()),
      title: asyncYobta(requiredYobta()),
    }),
  )
  const result = await attempt({})
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'title',
        message: 'Required',
        path: ['title'],
      }),
      new YobtaError({
        field: 'address',
        message: 'Required',
        path: ['address'],
      }),
      new YobtaError({
        field: 'description',
        message: 'Required',
        path: ['description'],
      }),
      new YobtaError({
        field: '@',
        message: asyncShapeMessage,
        path: ['@'],
      }),
    ],
  ])
})
