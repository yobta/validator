/* eslint-disable import/extensions */
import { transformYobta } from '.'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'

it('creates params from string', () => {
  const validate = yobta(
    stringYobta(),
    requiredYobta(),
    transformYobta((input, ctx) => [input, ctx]),
  )

  const result = validate('yobta')

  expect(result).toEqual(['yobta', expect.any(Object)])
})
