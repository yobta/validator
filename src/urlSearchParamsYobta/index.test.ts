/* eslint-disable import/extensions */
import { urlSearchParamsYobta } from './'
import { yobta } from '../yobta'

const validate = yobta(urlSearchParamsYobta())

it('creates params from string', () => {
  let result = validate('?param=yobta')
  expect(result).toEqual({ param: 'yobta' })
})
