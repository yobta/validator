/* eslint-disable import/extensions */

import {
  constant,
  createAsyncValidator,
  different,
  fallback,
  identical,
  shape,
  string,
  stringMessage,
} from '..'
import { createContext } from '../_internal/createContext'
import { YobtaError } from '../YobtaError'
import { asyncShape, asyncShapeMessage } from './asyncShape'

const validate = createAsyncValidator(
  asyncShape({
    age: createAsyncValidator(string()),
    name: createAsyncValidator(string()),
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
    createAsyncValidator(
      asyncShape(
        {
          name: createAsyncValidator(constant('yobta')),
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
    asyncShape({
      name: createAsyncValidator(string()),
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
  const attempt = createAsyncValidator(
    fallback(() => replaced),
    shape({
      newPassword: different(() => ['password']),
      password: string(),
      retypePassword: identical(['newPassword']),
    }),
  )
  const result = await attempt(undefined)
  expect(result).toEqual([replaced, null])
})

it('has no racing condition', async () => {
  const attempt = createAsyncValidator(
    asyncShape({
      address: createAsyncValidator(constant('yobta')),
      description: createAsyncValidator(constant('yobta')),
      title: createAsyncValidator(constant('yobta')),
    }),
  )
  const result = await attempt({})
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'title',
        message: 'Should be identical to "yobta"',
        path: ['title'],
      }),
      new YobtaError({
        field: 'address',
        message: 'Should be identical to "yobta"',
        path: ['address'],
      }),
      new YobtaError({
        field: 'description',
        message: 'Should be identical to "yobta"',
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