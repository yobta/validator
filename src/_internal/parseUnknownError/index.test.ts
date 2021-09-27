import { parseUnknownError } from '.'

it('can parse error', () => {
  let error = new Error('yobta')
  let result = parseUnknownError(error)
  expect(result).toEqual(error)
})

it('can parse non-error', () => {
  let nonError = [1]
  let result = parseUnknownError(nonError)

  expect(result).toEqual({ name: 'Unknown error', message: '1' })
})
