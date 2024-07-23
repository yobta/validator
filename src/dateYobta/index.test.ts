/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { dateMessage, dateYobta } from './'

const customMessage = 'yobta!'
const validate = createValidator(dateYobta(customMessage))

it('accepts valid dates', () => {
  const date = new Date()
  const result = validate(date)
  expect(result).toEqual(date)
})

it('accepts timestamps', () => {
  const now = Date.now()
  const result = validate(now)
  expect(result).toEqual(new Date(now))
})

it('accepts stringified dates', () => {
  const string = '2021-08-16T13:16:32.000Z'
  const result = validate(string)
  expect(result).toEqual(new Date(string))
})

it('rejects invalid dates', () => {
  const variants = [undefined, null, 'yobta', [], {}, new Set(), new Map()]
  variants.forEach(variant => {
    const attempt = (): any => validate(variant)
    expect(attempt).toThrow(customMessage)
  })
})

it('has default error message', () => {
  const validateDefault = (): any => createValidator(dateYobta())(null)
  expect(validateDefault).toThrow(dateMessage)
})
