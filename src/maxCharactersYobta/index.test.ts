import { yobta } from '../yobta'
import { maxCharactersYobta, maxCharactersMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(maxCharactersYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate('a')
  expect(result).toBe('a')
})

it('accepts smaller lenght', () => {
  let result = validate('')
  expect(result).toBe('')
})

it('regects greater lenght', () => {
  let attempt = (): any => validate('ab')
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  let validateDefault = yobta(maxCharactersYobta(1))
  let attempt = (): any => validateDefault('ab')
  expect(attempt).toThrow(maxCharactersMessage(1))
})
