import { syncYobta } from '../syncYobta'
import { urlSearchParamsYobta } from '.'

const validate = syncYobta(urlSearchParamsYobta())

it('creates params from string', () => {
  let result = validate('?yobta=param')
  expect(result.get('yobta')).toBe('param')
})
