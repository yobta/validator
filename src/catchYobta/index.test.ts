import { stringYobta } from '../stringYobta'
import { syncYobta } from '../syncYobta'
import { catchYobta } from '.'
import { requiredYobta } from '../requiredYobta'
import { minCharactersYobta } from '../minCharactersYobta'

const validate = syncYobta(
  catchYobta(
    'catched yobta!',
    stringYobta(),
    requiredYobta(),
    minCharactersYobta(5)
  )
)

it('does not catch when no errors', () => {
  let result = validate('yobta')
  expect(result).toEqual('yobta')
})

it('catches when errors', () => {
  let result = validate('')
  expect(result).toEqual('catched yobta!')
})
