import { createEvent } from '@testing-library/dom'

import { yobta } from '../yobta'
import { formYobta, formDataMessage } from '.'

const validate = yobta(formYobta())

it('accepts form instance', () => {
  let input = document.createElement('form')
  let result = validate(input)
  expect(result).toEqual({})
})

it('accepts event', () => {
  let form = document.createElement('form')
  let event = createEvent.submit(form)
  Object.defineProperty(event, 'currentTarget', { value: form })
  let result = validate(event)
  expect(result).toEqual({})
})

it('can be undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects invalid input', () => {
  let attempt = (): any => validate([])
  expect(attempt).toThrow(formDataMessage)
})

it('has custom error messages', () => {
  let attempt = (): any => yobta(formYobta('yobta!'))(null)
  expect(attempt).toThrow('yobta!')
})
