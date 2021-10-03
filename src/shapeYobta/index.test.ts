import { shapeYobta, shapeMessage } from './'
import { yobta } from '../yobta'
import { stringYobta, stringMessage } from '../stringYobta'
import { requiredYobta } from '../requiredYobta'
import { defaultYobta, differentYobta, effectYobta, identicalYobta } from '..'
import { YobtaError } from '../_internal/YobtaError'

const validate = yobta(
  shapeYobta({
    name: [stringYobta(), requiredYobta<string>()],
  }),
)

describe('shapeYobta', () => {
  it('accepts valid shapes', () => {
    let result = validate({
      name: 'yobta',
    })
    expect(result).toEqual({ name: 'yobta' })
  })

  it('accepts valid shapes with overload', () => {
    let result = validate({
      name: 'yobta',
      age: 0,
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
      yobta(
        shapeYobta(
          {
            name: [stringYobta()],
          },
          'yobta!',
        ),
      )([])
    expect(attempt).toThrow('yobta!')
  })

  it('captures errors from field validators', () => {
    let attempt = (): any =>
      validate({
        name: [],
      })
    expect(attempt).toThrow(stringMessage)
  })

  it('preserves yobta error', () => {
    let yobtaError = new YobtaError({
      field: 'yobta',
      message: 'yobta',
      path: [],
    })
    let attempt = (): any =>
      yobta(
        shapeYobta({
          name: [
            effectYobta(() => {
              throw yobtaError
            }),
          ],
        }),
      )({})
    expect(attempt).toThrow(yobtaError)
  })
  it('should replace context.data', () => {
    let replaced = {
      password: 'old yobta',
      newPassword: 'new yobta',
      retypePassword: 'new yobta',
    }
    let attempt = yobta(
      defaultYobta(replaced),
      shapeYobta({
        password: [stringYobta()],
        newPassword: [differentYobta(['password'])],
        retypePassword: [identicalYobta(['newPassword'])],
      }),
    )
    let result = attempt(undefined)
    expect(result).toEqual(replaced)
  })
})
