/* eslint-disable import/extensions */
import { transformYobta } from '.'
import { createValidator } from '../createValidator/createValidator'
import { string } from '../string'

it('creates params from string', () => {
  const validate = createValidator(
    string(),
    transformYobta((input, ctx) => [input, ctx]),
  )

  const result = validate('yobta')

  expect(result).toEqual(['yobta', expect.any(Object)])
})
