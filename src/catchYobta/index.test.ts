import { stringYobta } from '../stringYobta'
import { syncYobta } from '../syncYobta'
import { catchYobta } from '.'
import { requiredYobta } from '../requiredYobta'
import { minCharactersYobta } from '../minCharactersYobta'

const validate = syncYobta(
  catchYobta(
    'catched yobta!',
    stringYobta(),
    requiredYobta<string>(),
    minCharactersYobta(5)
  )
)

it('does not catch when no errors', () => {
  let result = validate('yobta')
  expect(result).toEqual(['yobta', null])
})

it('catches when errors', () => {
  let result = validate('')
  expect(result).toEqual(['catched yobta!', null])
})
