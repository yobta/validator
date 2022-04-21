/* eslint-disable import/extensions */
import { catchYobta } from './'
import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { requiredYobta } from '../requiredYobta'
import { minCharactersYobta } from '../minCharactersYobta'

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
