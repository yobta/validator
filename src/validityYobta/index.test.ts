/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import { asyncYobta, requiredYobta, shapeYobta, stringYobta } from '../'
import { createContext } from '../_internal/createContext'
import { formYobta } from '../formYobta'
import { validityMessage, validityYobta } from './'

interface FormMock {
  (): {
    checkbox: HTMLInputElement
    form: HTMLFormElement
    input: HTMLInputElement
  }
}
const mockForm: FormMock = () => {
  const form = document.createElement('form')
  const input = document.createElement('input')
  const checkbox = document.createElement('input')

  input.setAttribute('type', 'text')
  input.setAttribute('name', 'text')
  form.appendChild(input)
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('name', 'checkbox')
  form.appendChild(checkbox)

  return { checkbox, form, input }
}

describe('validityYobta', () => {
  it('throws when gets a non-form event', () => {
    const input = document.createElement('input')
    const data = { currentTarget: input }
    const context = createContext(data)

    expect(() => validityYobta()(context)({})).toThrow(validityMessage)
  })

  it('throws when gets a non-event and has a custom error message', () => {
    const context = createContext('yobta')

    expect(() =>
      validityYobta({ missingFormMessage: 'yobta!' })(context)({}),
    ).toThrow('yobta!')
  })

  it('sets validity for all errors when event target is form and resets when error is fixed', async () => {
    const { checkbox, form, input } = mockForm()
    const validate = asyncYobta(
      formYobta(),
      shapeYobta({
        checkbox: [stringYobta(), requiredYobta<string>()],
        text: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'all' }),
    )

    const submitEvent = createEvent.submit(form)
    Object.defineProperty(submitEvent, 'currentTarget', { value: form })
    Object.defineProperty(submitEvent, 'target', { value: form })

    const changeEvent = createEvent.change(form)
    Object.defineProperty(changeEvent, 'currentTarget', { value: form })
    Object.defineProperty(changeEvent, 'target', { value: input })

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)

    await validate(submitEvent)

    expect(input.checkValidity()).toBe(false)
    expect(checkbox.checkValidity()).toBe(false)

    input.setAttribute('value', 'yobta')

    await validate(changeEvent)

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(false)
  })

  it('filters errors by input name when event target not a form', async () => {
    const { checkbox, form, input } = mockForm()
    const validate = asyncYobta(
      formYobta(),
      shapeYobta({
        checkbox: [stringYobta(), requiredYobta<string>()],
        text: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'all' }),
    )

    const changeEvent = createEvent.change(input)
    Object.defineProperty(changeEvent, 'currentTarget', { value: form })
    Object.defineProperty(changeEvent, 'target', { value: input })

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)

    const result = await validate(changeEvent)

    expect(result).toEqual([null, expect.any(Array)])
    expect(input.checkValidity()).toBe(false)
    expect(checkbox.checkValidity()).toBe(true)
  })

  it('ignores change when mode is submit-only', async () => {
    const { checkbox, form, input } = mockForm()
    const validate = asyncYobta(
      formYobta(),
      shapeYobta({
        checkbox: [stringYobta(), requiredYobta<string>()],
        text: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'submit-only' }),
    )

    const changeEvent = createEvent.change(input)
    Object.defineProperty(changeEvent, 'currentTarget', { value: form })
    Object.defineProperty(changeEvent, 'target', { value: input })

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)

    const result = await validate(changeEvent)

    expect(result).toEqual([null, expect.any(Array)])
    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)
  })

  it('reports errors when mode is submit-only and event type is submit', async () => {
    const { checkbox, form, input } = mockForm()

    const inputSpy = jest.spyOn(input, 'setCustomValidity')
    const checkboxSpy = jest.spyOn(checkbox, 'setCustomValidity')

    const validate = asyncYobta(
      formYobta(),
      shapeYobta({
        checkbox: [stringYobta(), requiredYobta<string>()],
        text: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'submit-only' }),
    )

    const submitEvent = createEvent.change(form)
    Object.defineProperty(submitEvent, 'currentTarget', { value: form })
    Object.defineProperty(submitEvent, 'target', { value: form })

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)

    const result = await validate(submitEvent)

    expect(result).toEqual([null, expect.any(Array)])
    expect(inputSpy).not.toHaveBeenCalled()
    expect(checkboxSpy).not.toHaveBeenCalled()

    inputSpy.mockRestore()
    checkboxSpy.mockRestore()
  })
})
