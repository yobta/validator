/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { stringYobta } from '../stringYobta'
import { maxCharactersMessage, maxCharactersYobta } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(
  stringYobta(),
  maxCharactersYobta(1, customMessage),
)

it('accepts exact lenght', () => {
  const result = validate('a')
  expect(result).toBe('a')
})

it('accepts smaller lenght', () => {
  const result = validate('')
  expect(result).toBe('')
})

it('regects greater lenght', () => {
  const attempt = (): any => validate('ab')
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = createValidator(stringYobta(), maxCharactersYobta(1))
  const attempt = (): any => validateDefault('ab')
  expect(attempt).toThrow(maxCharactersMessage(1))
})
