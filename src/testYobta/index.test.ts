import { syncYobta } from '../syncYobta'
import { testYobta, testMessage } from './'

const regExp = /fo*/

const customMessage = 'yobta!'
const validate = syncYobta(testYobta(regExp, customMessage))

it('accepts if mathed', () => {
  let result = validate('table football')
  expect(result).toBe('table football')
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('regects if not matched', () => {
  let attempt = (): any => validate('yobta')
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  let validateDefault = syncYobta(testYobta(regExp))
  let attempt = (): any => validateDefault('yobta')
  expect(attempt).toThrow(testMessage)
})
