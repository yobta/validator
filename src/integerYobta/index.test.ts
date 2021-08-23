import { syncYobta } from '../syncYobta'
import { integerYobta, integerMessage } from './'

const customMessage = 'yobta!'
const validate = syncYobta(integerYobta(customMessage))

it('accepts integers', () => {
  let result = validate(1)
  expect(result).toEqual(1)
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects floats', () => {
  let attempt = (): any => validate(2.2)
  expect(attempt).toThrow(customMessage)
})

it('has default error message', () => {
  let validateDefault = syncYobta(integerYobta())
  let attempt = (): any => validateDefault(0.1)
  expect(attempt).toThrow(integerMessage)
})
