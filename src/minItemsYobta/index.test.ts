import { syncYobta } from '../syncYobta'
import { minItemsYobta, minItemsMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(minItemsYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate([1])
  expect(result).toEqual([1])
})

it('accepts greater lenght', () => {
  let result = validate([1, 2])
  expect(result).toEqual([1, 2])
})

it('regects insufficient lenght', () => {
  let attempt = (): any => validate([])
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  let validateDefault = syncYobta(minItemsYobta(1))
  let attempt = (): any => validateDefault([])
  expect(attempt).toThrow(minItemsMessage(1))
})
