/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { minCharactersYobta } from '../minCharactersYobta'
import { requiredYobta } from '../requiredYobta'
import { string } from '../string'
import { safe } from './safe'

const validate = createValidator(
  safe('catched yobta!', string(), requiredYobta(), minCharactersYobta(5)),
)

it('does not catch when no errors', () => {
  const result = validate('yobta')
  expect(result).toEqual('yobta')
})

it('catches when errors', () => {
  const result = validate('')
  expect(result).toEqual('catched yobta!')
})
