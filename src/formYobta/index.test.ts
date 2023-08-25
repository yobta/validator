/* eslint-disable import/extensions */
import { createEvent } from '@testing-library/dom'

import { createContext } from '../_internal/createContext'
import { fromEntries } from '../_internal/fromEntries'
import { yobta } from '../yobta'
import { formDataMessage, formYobta } from './'

const validate = yobta(formYobta())

describe('formYobta', () => {
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

  it('takes form from context', () => {
    let form = document.createElement('form')
    form.innerHTML = `<input type="text" value="yobta" />`

    let event = createEvent.submit(form)
    Object.defineProperty(event, 'currentTarget', { value: form })
    let context = createContext(event)
    let result = formYobta()(context)(event)
    let formData = new FormData(form)
    let plainObject = fromEntries(formData)

    expect(result).toEqual(plainObject)
  })
})
