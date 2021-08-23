import { syncYobta } from '../syncYobta'
import { maximumYobta, maximumYobtaMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(maximumYobta(1, customMessage))

it('accepts exact number', () => {
  let result = validate(1)
  expect(result).toBe(1)
})

it('accepts smaller number', () => {
  let result = validate(0)
  expect(result).toBe(0)
})

it('regects greater number', () => {
  let attempt = (): any => validate(2)
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  let validateDefault = syncYobta(maximumYobta(1))
  let attempt = (): any => validateDefault(2)
  expect(attempt).toThrow(maximumYobtaMessage(1))
})
