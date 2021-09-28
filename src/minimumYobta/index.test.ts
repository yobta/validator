import { yobta } from '../yobta'
import { minimumYobta, minimumYobtaMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(minimumYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate(1)
  expect(result).toBe(1)
})

it('accepts greater lenght', () => {
  let result = validate(2)
  expect(result).toBe(2)
})

it('regects insufficient lenght', () => {
  let assign = (): any => validate(0)
  expect(assign).toThrow(customMessage(1))
})

it('has default error message', () => {
  let validateDefault = yobta(minimumYobta(1))
  let assign = (): any => validateDefault(0)
  expect(assign).toThrow(minimumYobtaMessage(1))
})
