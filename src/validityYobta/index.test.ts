/* eslint-disable import/extensions */
import { createEvent } from '@testing-library/dom'
import jest from 'jest-mock'

import { validityMessage, validityYobta } from './'
import { asyncYobta, requiredYobta, shapeYobta, stringYobta } from '../'
import { formYobta } from '../formYobta'
import { createContext } from '../_internal/createContext'

interface FormMock {
  (): {
    form: HTMLFormElement
    input: HTMLInputElement
    checkbox: HTMLInputElement
  }
}
const mockForm: FormMock = () => {
  let form = document.createElement('form')
  let input = document.createElement('input')
  let checkbox = document.createElement('input')

  input.setAttribute('type', 'text')
  input.setAttribute('name', 'text')
  form.appendChild(input)
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('name', 'checkbox')
  form.appendChild(checkbox)

  return { form, input, checkbox }
}

describe('validityYobta', () => {
  it('throws when gets a non-form event', () => {
    let input = document.createElement('input')
    let data = { currentTarget: input }
    let context = createContext(data)

    expect(() => validityYobta()(context)({})).toThrow(validityMessage)
  })

  it('throws when gets a non-event and has a custom error message', () => {
    let context = createContext('yobta')

    expect(() =>
      validityYobta({ missingFormMessage: 'yobta!' })(context)({}),
    ).toThrow('yobta!')
  })

  it('sets validity for all errors when event target is form and resets when error is fixed', async () => {
    let { form, input, checkbox } = mockForm()
    let validate = asyncYobta(
      formYobta(),
      shapeYobta({
        text: [stringYobta(), requiredYobta<string>()],
        checkbox: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'all' }),
    )

    let submitEvent = createEvent.submit(form)
    Object.defineProperty(submitEvent, 'currentTarget', { value: form })
    Object.defineProperty(submitEvent, 'target', { value: form })

    let changeEvent = createEvent.change(form)
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
    let { form, input, checkbox } = mockForm()
    let validate = asyncYobta(
      formYobta(),
      shapeYobta({
        text: [stringYobta(), requiredYobta<string>()],
        checkbox: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'all' }),
    )

    let changeEvent = createEvent.change(input)
    Object.defineProperty(changeEvent, 'currentTarget', { value: form })
    Object.defineProperty(changeEvent, 'target', { value: input })

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)

    let result = await validate(changeEvent)

    expect(result).toEqual([null, expect.any(Array)])
    expect(input.checkValidity()).toBe(false)
    expect(checkbox.checkValidity()).toBe(true)
  })

  it('ignores change when mode is submit-only', async () => {
    let { form, input, checkbox } = mockForm()
    let validate = asyncYobta(
      formYobta(),
      shapeYobta({
        text: [stringYobta(), requiredYobta<string>()],
        checkbox: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'submit-only' }),
    )

    let changeEvent = createEvent.change(input)
    Object.defineProperty(changeEvent, 'currentTarget', { value: form })
    Object.defineProperty(changeEvent, 'target', { value: input })

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)

    let result = await validate(changeEvent)

    expect(result).toEqual([null, expect.any(Array)])
    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)
  })

  it('reports errors when mode is submit-only and event type is submit', async () => {
    let { form, input, checkbox } = mockForm()

    let inputSpy = jest.spyOn(input, 'setCustomValidity')
    let checkboxSpy = jest.spyOn(checkbox, 'setCustomValidity')

    let validate = asyncYobta(
      formYobta(),
      shapeYobta({
        text: [stringYobta(), requiredYobta<string>()],
        checkbox: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta({ mode: 'submit-only' }),
    )

    let submitEvent = createEvent.change(form)
    Object.defineProperty(submitEvent, 'currentTarget', { value: form })
    Object.defineProperty(submitEvent, 'target', { value: form })

    expect(input.checkValidity()).toBe(true)
    expect(checkbox.checkValidity()).toBe(true)

    let result = await validate(submitEvent)

    expect(result).toEqual([null, expect.any(Array)])
    expect(inputSpy).not.toHaveBeenCalled()
    expect(checkboxSpy).not.toHaveBeenCalled()

    inputSpy.mockRestore()
    checkboxSpy.mockRestore()
  })
})
