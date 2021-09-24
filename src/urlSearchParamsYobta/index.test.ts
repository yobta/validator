import { syncYobta } from '../syncYobta'
import { urlSearchParamsYobta } from '.'

const validate = syncYobta(urlSearchParamsYobta())

it('creates params from string', () => {
  let result = validate('?param=yobta')
  expect(result).toEqual({ param: 'yobta' })
})
