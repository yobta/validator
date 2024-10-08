/* eslint-disable import/extensions */

import {
  constant,
  createAsyncValidator,
  different,
  fallback,
  identical,
  pipe,
  required,
  shape,
  string,
  stringMessage,
} from '..'
import { createContext } from '../_internal/createContext/createContext'
import { YobtaError } from '../YobtaError'
import { asyncShape, asyncShapeMessage } from './asyncShape'

const validate = createAsyncValidator(
  asyncShape({
    age: string(),
    name: string(),
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

it('accepts undefined', async () => {
  const validateUndefined = createAsyncValidator(asyncShape({}))
  const result = await validateUndefined(undefined)
  expect(result).toEqual([undefined, null])
})

it('casts empty string to undefined', async () => {
  const result = await validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('has custom error messages', async () => {
  const attempt = (): any =>
    createAsyncValidator(
      asyncShape(
        {
          name: constant('yobta'),
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
  const result = await validate({
    name: [],
  })

  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'age',
        message: stringMessage,
        path: ['age'],
      }),
    ],
  ])
})

it('returns errors for invalid keys', async () => {
  const context = createContext({})

  const result = await asyncShape({
    name: string(),
  })(context)({
    name: {},
  })

  expect(result).toEqual({ name: {} })

  expect(context.errors).toEqual([
    new YobtaError({
      field: 'title',
      message: 'It should be a string',
      path: ['title'],
    }),
  ])
})

it('should replace context.data', async () => {
  const replaced = {
    newPassword: 'new yobta',
    password: 'old yobta',
    retypePassword: 'new yobta',
  }
  const attempt = createAsyncValidator(
    fallback(replaced),
    shape({
      newPassword: different('password'),
      password: string(),
      retypePassword: identical('newPassword'),
    }),
  )
  const result = await attempt(undefined)
  expect(result).toEqual([replaced, null])
})

it('has no racing condition', async () => {
  const attempt = createAsyncValidator(
    asyncShape({
      address: pipe(constant('yobta'), required()),
      description: pipe(constant('yobta'), required()),
      title: pipe(constant('yobta'), required()),
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
    ],
  ])
})
