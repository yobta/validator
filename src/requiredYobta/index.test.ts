import { stringYobta } from '../stringYobta'
import { syncYobta } from '../syncYobta'
import { requiredYobta, requiredMessage } from './'

const customMessage = 'yobta!'
const validate = syncYobta(stringYobta(), requiredYobta<string>(customMessage))

it('accepts value', () => {
  let result = validate('yobta')
  expect(result).toEqual(['yobta', null])
})

it('rejects undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage, path: [] }]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(stringYobta(), requiredYobta<string>())
  let result = validateDefault(undefined)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: requiredMessage, path: [] }]
  ])
})
