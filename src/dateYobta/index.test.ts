/* eslint-disable import/extensions */
import { dateYobta, dateMessage } from './'
import { yobta } from '../yobta'

const customMessage = 'yobta!'
const validate = yobta(dateYobta(customMessage))

it('accepts valid dates', () => {
  let date = new Date()
  let result = validate(date)
  expect(result).toEqual(date)
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('accepts timestamps', () => {
  let now = Date.now()
  let result = validate(now)
  expect(result).toEqual(new Date(now))
})

it('accepts stringified dates', () => {
  let string = '2021-08-16T13:16:32.000Z'
  let result = validate(string)
  expect(result).toEqual(new Date(string))
})

it('rejects invalid dates', () => {
  let variants = [null, 'yobta', [], {}, new Set(), new Map()]
  variants.forEach(variant => {
    let attempt = (): any => validate(variant)
    expect(attempt).toThrow(customMessage)
  })
})

it('has default error message', () => {
  let validateDefault = (): any => yobta(dateYobta())(null)
  expect(validateDefault).toThrow(dateMessage)
})
