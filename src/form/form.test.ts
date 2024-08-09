/* eslint-disable import/extensions */
import { createEvent } from '@testing-library/dom'

import { createContext } from '../_internal/createContext'
import { fromEntries } from '../_internal/fromEntries'
import { createValidator } from '../createValidator/createValidator'
import { form, formMessage } from './form'

const validate = createValidator(form())

it('accepts form instance', () => {
  const input = document.createElement('form')
  const result = validate(input)
  expect(result).toEqual({})
})

it('accepts event', () => {
  const formNode = document.createElement('form')
  const event = createEvent.submit(formNode)
  Object.defineProperty(event, 'currentTarget', { value: formNode })
  const result = validate(event)
  expect(result).toEqual({})
})

it('casts empty values to undefined', () => {
  const variants = ['', null, NaN, undefined]

  variants.forEach(variant => {
    const result = validate(variant)
    expect(result).toBeUndefined()
  })
})

it('rejects invalid input', () => {
  const attempt = (): any => validate([])
  expect(attempt).toThrow(formMessage)
})

it('has custom error messages', () => {
  const attempt = (): any => createValidator(form('yobta!'))([])
  expect(attempt).toThrow('yobta!')
})

it('takes form from context', () => {
  const formNode = document.createElement('form')
  formNode.innerHTML = `<input type="text" value="yobta" />`

  const event = createEvent.submit(formNode)
  Object.defineProperty(event, 'currentTarget', { value: formNode })
  const context = createContext(event)
  const result = form()(context)(event)
  const formData = new FormData(formNode)
  const plainObject = fromEntries(formData)

  expect(result).toEqual(plainObject)
})
