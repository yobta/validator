/* eslint-disable import/extensions */
import { transformYobta } from '.'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { createValidator } from '../createValidator/createValidator'

it('creates params from string', () => {
  const validate = createValidator(
    stringYobta(),
    requiredYobta(),
    transformYobta((input, ctx) => [input, ctx]),
  )

  const result = validate('yobta')

  expect(result).toEqual(['yobta', expect.any(Object)])
})
