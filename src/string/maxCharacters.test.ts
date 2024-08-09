/* eslint-disable import/extensions */
import { string } from '.'
import { createValidator } from '../createValidator/createValidator'
import { maxCharacters, maxCharactersMessage } from './maxCharacters'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(
  string(),
  maxCharacters(() => 1, customMessage),
)

it('accepts exact lenght', () => {
  const result = validate('a')
  expect(result).toBe('a')
})

it('accepts smaller lenght', () => {
  const result = validate('')
  expect(result).toBe('')
})

it('accepts undefined', () => {
  const validateUndefiend = createValidator(
    string(),
    maxCharacters(() => 1, customMessage),
  )
  const result = validateUndefiend(undefined)
  expect(result).toBeUndefined()
})

it('regects greater lenght', () => {
  const attempt = (): any => validate('ab')
  expect(attempt).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = createValidator(
    string(),
    maxCharacters(() => 1),
  )
  const attempt = (): any => validateDefault('ab')
  expect(attempt).toThrow(maxCharactersMessage(1))
})
