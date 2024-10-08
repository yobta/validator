/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { date, dateMessage } from './date'

const customMessage = 'yobta!'
const validate = createValidator(date(customMessage))

it('accepts valid dates', () => {
  const someDate = new Date()
  const result = validate(someDate)
  expect(result).toEqual(someDate)
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

it('has default error message', () => {
  const validateDefault = (): any => createValidator(date())({})
  expect(validateDefault).toThrow(dateMessage)
})

it('casts empty values to undefined', () => {
  const variants = ['', undefined]

  variants.forEach(variant => {
    const result = validate(variant)
    expect(result).toBeUndefined()
  })
})

it('rejects non-date values', () => {
  const variants = [null, NaN, [], {}, 'yobta', new Set(), new Map()]

  variants.forEach(variant => {
    expect(() => validate(variant)).toThrow(customMessage)
  })
})
