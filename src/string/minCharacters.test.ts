/* eslint-disable import/extensions */
import { string } from '.'
import { createValidator } from '../createValidator/createValidator'
import { minCharacters, minCharactersMessage } from './minCharacters'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = createValidator(string(), minCharacters(2, customMessage))

it('accepts exact lenght', () => {
  const result = validate('ab')
  expect(result).toBe('ab')
})

it('accepts greater lenght', () => {
  const result = validate('abc')
  expect(result).toBe('abc')
})

it('rejects insufficient lenght', () => {
  const attempt = (): any => validate('a')
  expect(attempt).toThrow(customMessage(2))
})

it('accepts undefined', () => {
  const validateUndefiend = createValidator(
    string(),
    minCharacters(1, customMessage),
  )
  const result = validateUndefiend(undefined)
  expect(result).toBeUndefined()
})

it('has default error message', () => {
  const validateDefault = createValidator(string(), minCharacters(2))
  const attempt = (): any => validateDefault('a')
  expect(attempt).toThrow(minCharactersMessage(2))
})
