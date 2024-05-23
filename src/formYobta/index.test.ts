/* eslint-disable import/extensions */
import { createEvent } from '@testing-library/dom'

import { createContext } from '../_internal/createContext'
import { fromEntries } from '../_internal/fromEntries'
import { yobta } from '../yobta'
import { formDataMessage, formYobta } from './'

const validate = yobta(formYobta())

describe('formYobta', () => {
  it('accepts form instance', () => {
    const input = document.createElement('form')
    const result = validate(input)
    expect(result).toEqual({})
  })

  it('accepts event', () => {
    const form = document.createElement('form')
    const event = createEvent.submit(form)
    Object.defineProperty(event, 'currentTarget', { value: form })
    const result = validate(event)
    expect(result).toEqual({})
  })

  it('can be undefined', () => {
    const result = validate(undefined)
    expect(result).toBeUndefined()
  })

  it('rejects invalid input', () => {
    const attempt = (): any => validate([])
    expect(attempt).toThrow(formDataMessage)
  })

  it('has custom error messages', () => {
    const attempt = (): any => yobta(formYobta('yobta!'))(null)
    expect(attempt).toThrow('yobta!')
  })

  it('takes form from context', () => {
    const form = document.createElement('form')
    form.innerHTML = `<input type="text" value="yobta" />`

    const event = createEvent.submit(form)
    Object.defineProperty(event, 'currentTarget', { value: form })
    const context = createContext(event)
    const result = formYobta()(context)(event)
    const formData = new FormData(form)
    const plainObject = fromEntries(formData)

    expect(result).toEqual(plainObject)
  })
})
