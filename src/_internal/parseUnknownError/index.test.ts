/* eslint-disable import/extensions */
import { YobtaError } from '../../YobtaError'
import { handleUnknownError } from './'

describe('handleUnknownError', () => {
  it('can parse error', () => {
    const error = new YobtaError({ field: '@', message: 'yobta', path: [] })
    const result = handleUnknownError({ error, field: '', path: ['p'] })
    expect(result).toEqual(error)
  })

  it('can parse non-error', () => {
    const nonError = [1]
    const result = handleUnknownError({
      error: nonError,
      field: '@',
      path: [],
    })

    expect(result).toEqual(
      new YobtaError({ field: '@', message: '1', path: [] }),
    )
  })
})
