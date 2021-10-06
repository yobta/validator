import { handleUnknownError } from '.'
import { YobtaError } from '../../YobtaError'

describe('handleUnknownError', () => {
  it('can parse error', () => {
    let error = new YobtaError({ field: '@', message: 'yobta', path: [] })
    let result = handleUnknownError({ error, field: '', path: ['p'] })
    expect(result).toEqual(error)
  })

  it('can parse non-error', () => {
    let nonError = [1]
    let result = handleUnknownError({
      error: nonError,
      field: '@',
      path: [],
    })

    expect(result).toEqual(
      new YobtaError({ field: '@', message: '1', path: [] }),
    )
  })
})
