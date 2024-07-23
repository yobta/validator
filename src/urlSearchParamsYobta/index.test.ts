/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { urlSearchParamsYobta } from './'

const validate = createValidator(urlSearchParamsYobta())

it('creates params from string', () => {
  const result = validate('?param=yobta')
  expect(result).toEqual({ param: 'yobta' })
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toEqual({})
})
