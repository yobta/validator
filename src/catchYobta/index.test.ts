/* eslint-disable import/extensions */
import { minCharactersYobta } from '../minCharactersYobta'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { catchYobta } from './'

const validate = yobta(
  catchYobta(
    'catched yobta!',
    stringYobta(),
    requiredYobta(),
    minCharactersYobta(5),
  ),
)

it('does not catch when no errors', () => {
  let result = validate('yobta')
  expect(result).toEqual('yobta')
})

it('catches when errors', () => {
  let result = validate('')
  expect(result).toEqual('catched yobta!')
})
