/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { urlSearchParamsYobta } from './'

const validate = yobta(urlSearchParamsYobta())

it('creates params from string', () => {
  let result = validate('?param=yobta')
  expect(result).toEqual({ param: 'yobta' })
})
