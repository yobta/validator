import { jest } from '@jest/globals'

import { awaitShapeYobta, asyncShapeMessage } from '.'
import { createContext } from '../_internal/createContext'
import { YobtaError } from '../_internal/YobtaError'
import {
  asyncYobta,
  defaultYobta,
  differentYobta,
  identicalYobta,
  shapeYobta,
  requiredYobta,
  stringYobta,
  stringMessage,
} from '..'

const validate = asyncYobta(
  awaitShapeYobta({
    name: [stringYobta(), requiredYobta<string>()],
  }),
)

describe('awaitShapeYobta', () => {
  it('accepts valid shapes', async () => {
    let result = await validate({
      name: 'yobta',
    })
    expect(result).toEqual([{ name: 'yobta' }, null])
  })

  it('accepts valid shapes with overload', async () => {
    let result = await validate({
      name: 'yobta',
      age: 0,
    })
    expect(result).toEqual([{ age: 0, name: 'yobta' }, null])
  })

  it('rejects invalid input', async () => {
    let attempt = async (): Promise<any> => await validate([])
    let result = await attempt()
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

  it('can be undefined', async () => {
    let result = await validate(undefined)
    expect(result).toEqual([undefined, null])
  })

  it('has custom error messages', async () => {
    let attempt = (): any =>
      asyncYobta(
        awaitShapeYobta(
          {
            name: [stringYobta()],
          },
          'yobta!',
        ),
      )([])
    let result = await attempt()
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
    let attempt = (): any =>
      validate({
        name: [],
      })
    let result = await attempt()

    expect(result).toEqual([null, [new Error(stringMessage)]])
  })

  it('returns errors for invalid keys', async () => {
    let attempt = awaitShapeYobta({
      name: [stringYobta()],
    })
    let context = createContext({})
    jest.spyOn(context, 'pushError')
    let result = await attempt(context)({
      name: {},
    })
    expect(result).toEqual({ name: {} })
    expect(context.pushError).toHaveBeenCalledWith(new Error(stringMessage))
  })
  it('should replace context.data', async () => {
    let replaced = {
      password: 'old yobta',
      newPassword: 'new yobta',
      retypePassword: 'new yobta',
    }
    let attempt = asyncYobta(
      defaultYobta(replaced),
      shapeYobta({
        password: [stringYobta()],
        newPassword: [differentYobta(['password'])],
        retypePassword: [identicalYobta(['newPassword'])],
      }),
    )
    let result = await attempt(undefined)
    expect(result).toEqual([replaced, null])
  })
})
