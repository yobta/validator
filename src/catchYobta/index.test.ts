/* eslint-disable import/extensions */
import { minCharactersYobta } from '../minCharactersYobta'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { createValidator } from '../createValidator/createValidator'
import { catchYobta } from './'

const validate = createValidator(
  catchYobta(
    'catched yobta!',
    stringYobta(),
    requiredYobta(),
    minCharactersYobta(5),
  ),
)

it('does not catch when no errors', () => {
  const result = validate('yobta')
  expect(result).toEqual('yobta')
})

it('catches when errors', () => {
  const result = validate('')
  expect(result).toEqual('catched yobta!')
})
