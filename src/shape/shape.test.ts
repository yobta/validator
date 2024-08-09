/* eslint-disable import/extensions */
import { different, effect, fallback, identical, pipe } from '..'
import { createValidator } from '../createValidator/createValidator'
import { string, stringMessage } from '../string'
import { YobtaError } from '../YobtaError'
import { shape, shapeMessage } from './shape'

const validate = createValidator(
  shape({
    name: pipe(string()),
  }),
)

it('accepts valid shapes', () => {
  const result = validate({
    name: 'yobta',
  })
  expect(result).toEqual({ name: 'yobta' })
})

it('accepts valid shapes with overload', () => {
  const result = validate({
    age: 0,
    name: 'yobta',
  })

  expect(result).toEqual({ age: 0, name: 'yobta' })
})

it('rejects invalid input', () => {
  const attempt = (): any => validate([])
  expect(attempt).toThrow(shapeMessage)
})

it('accepts undefined', () => {
  const result = createValidator(shape({}))(undefined)
  expect(result).toBeUndefined()
})

it('has custom error messages', () => {
  const attempt = (): any =>
    createValidator(
      shape(
        {
          name: string(),
        },
        'yobta!',
      ),
    )([])
  expect(attempt).toThrow('yobta!')
})

it('captures errors from field validators', () => {
  const attempt = (): any =>
    validate({
      name: [],
    })
  expect(attempt).toThrow(stringMessage)
})

it('preserves yobta error', () => {
  const yobtaError = new YobtaError({
    field: 'yobta',
    message: 'yobta',
    path: [],
  })
  const attempt = (): any =>
    createValidator(
      shape({
        name: effect(() => {
          throw yobtaError
        }),
      }),
    )({
      name: 'yobta',
    })
  expect(attempt).toThrow(yobtaError)
})

it('should replace context.data', () => {
  const replaced = {
    newPassword: 'new yobta',
    password: 'old yobta',
    retypePassword: 'new yobta',
  }
  const attempt = createValidator(
    fallback(() => replaced),
    shape({
      newPassword: different(() => 'password'),
      password: string(),
      retypePassword: identical(() => 'newPassword'),
    }),
  )
  const result = attempt(undefined)
  expect(result).toEqual(replaced)
})
