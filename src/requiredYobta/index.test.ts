import { stringYobta } from '../stringYobta'
import { syncYobta } from '../syncYobta'
import { requiredYobta, requiredMessage } from './'

const customMessage = 'yobta!'
const validate = syncYobta(stringYobta(), requiredYobta<string>(customMessage))

it('accepts value', () => {
  let result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects undefined', () => {
  let attempt = (): any => validate(undefined)
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  let validateDefault = syncYobta(stringYobta(), requiredYobta<string>())
  let attempt = (): any => validateDefault(undefined)
  expect(attempt).toThrow(requiredMessage)
})
