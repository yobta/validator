/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { urlSearchParamsYobta } from './'

const validate = yobta(urlSearchParamsYobta())

it('creates params from string', () => {
  const result = validate('?param=yobta')
  expect(result).toEqual({ param: 'yobta' })
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toEqual({})
})
