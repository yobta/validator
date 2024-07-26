/* eslint-disable import/extensions */
import { string } from '.'
import { createValidator } from '../createValidator/createValidator'
import { minCharacters, minCharactersMessage } from './minCharacters'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(
  string(),
  minCharacters(() => 1, customMessage),
)

it('accepts exact lenght', () => {
  const result = validate('a')
  expect(result).toBe('a')
})

it('accepts greater lenght', () => {
  const result = validate('ab')
  expect(result).toBe('ab')
})

it('regects insufficient lenght', () => {
  const attempt = (): any => validate('')
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = createValidator(
    string(),
    minCharacters(() => 1),
  )
  const attempt = (): any => validateDefault('')
  expect(attempt).toThrow(minCharactersMessage(1))
})
