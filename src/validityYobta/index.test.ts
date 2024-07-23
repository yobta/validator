/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import {
  constYobta,
  createAsyncValidator,
  shapeMessage,
  shapeYobta,
  YobtaError,
} from '../'
import { createContext } from '../_internal/createContext'
import { formYobta } from '../formYobta'
import { validityMessage, validityYobta } from './'

interface FormMock {
  (): {
    checkbox: HTMLInputElement
    form: HTMLFormElement
    hiddenInput: HTMLInputElement
    input: HTMLInputElement
    readonlyInput: HTMLInputElement
    select: HTMLSelectElement
    textarea: HTMLTextAreaElement
  }
}
const mockForm: FormMock = () => {
  const form = document.createElement('form')

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('name', 'checkbox')
  form.appendChild(checkbox)

  const hiddenInput = document.createElement('input')
  hiddenInput.setAttribute('type', 'hidden')
  hiddenInput.setAttribute('name', 'hidden')
  form.appendChild(hiddenInput)

  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('name', 'text')
  form.appendChild(input)

  const readonlyInput = document.createElement('input')
  readonlyInput.setAttribute('type', 'text')
  readonlyInput.setAttribute('name', 'readonly')
  readonlyInput.setAttribute('readonly', 'readonly')
  form.appendChild(readonlyInput)

  const select = document.createElement('select')
  select.setAttribute('name', 'select')
  form.appendChild(select)

  const option1 = document.createElement('option')
  option1.setAttribute('value', 'option1')
  select.appendChild(option1)

  const option2 = document.createElement('option')
  option2.setAttribute('value', 'option2')
  select.appendChild(option2)

  const textarea = document.createElement('textarea')
  textarea.setAttribute('name', 'textarea')
  form.appendChild(textarea)

  return { checkbox, form, hiddenInput, input, readonlyInput, select, textarea }
}

const errorHandlerMock = jest.fn()

it('throws when gets a non-form event', () => {
  const input = document.createElement('input')
  const data = { currentTarget: input }
  const context = createContext(data)
  expect(() => validityYobta(errorHandlerMock)(context)({})).toThrow(
    validityMessage,
  )
})

it('throws when gets a non-event and has a custom error message', () => {
  const context = createContext('yobta')
  expect(() =>
    validityYobta(errorHandlerMock, { missingFormMessage: 'yobta!' })(context)(
      {},
    ),
  ).toThrow('yobta!')
})

it('reports validity for selects, inputs and textareas', async () => {
  const { checkbox, form, input, select, textarea } = mockForm()
  const validate = createAsyncValidator(
    formYobta(),
    shapeYobta({
      checkbox: constYobta('yobta'),
      select: constYobta('option2'),
      text: constYobta('yobta'),
      textarea: constYobta('yobta'),
    }),
    validityYobta(errorHandlerMock),
  )
  const submitEvent = createEvent.submit(form)
  Object.defineProperty(submitEvent, 'currentTarget', { value: form })
  Object.defineProperty(submitEvent, 'target', { value: form })

  expect(checkbox.checkValidity()).toBe(true)
  expect(input.checkValidity()).toBe(true)
  expect(select.checkValidity()).toBe(true)
  expect(textarea.checkValidity()).toBe(true)

  await validate(submitEvent)

  expect(errorHandlerMock).toHaveBeenCalledWith(
    new YobtaError({ field: '@', message: shapeMessage, path: [] }),
  )

  expect(checkbox.checkValidity()).toBe(false)
  expect(input.checkValidity()).toBe(false)
  expect(select.checkValidity()).toBe(false)
  expect(textarea.checkValidity()).toBe(false)

  checkbox.setAttribute('value', 'yobta')
  checkbox.checked = true
  input.setAttribute('value', 'yobta')
  select.value = 'option2'
  textarea.textContent = 'yobta'

  await validate(submitEvent)

  expect(checkbox.checkValidity()).toBe(true)
  expect(input.checkValidity()).toBe(true)
  expect(select.checkValidity()).toBe(true)
  expect(textarea.checkValidity()).toBe(true)
})

it('reports validity on submit and restores on input', async () => {
  const { checkbox, form, input } = mockForm()
  const validate = createAsyncValidator(
    formYobta(),
    shapeYobta({
      checkbox: constYobta('yobta'),
      text: constYobta('yobta'),
    }),
    validityYobta(errorHandlerMock),
  )
  const submitEvent = createEvent.submit(form)
  Object.defineProperty(submitEvent, 'currentTarget', { value: form })
  Object.defineProperty(submitEvent, 'target', { value: form })

  expect(input.checkValidity()).toBe(true)
  expect(checkbox.checkValidity()).toBe(true)

  await validate(submitEvent)

  expect(input.checkValidity()).toBe(false)
  expect(checkbox.checkValidity()).toBe(false)

  input.setAttribute('value', 'yobta')
  const changeEvent = createEvent.change(form)
  Object.defineProperty(changeEvent, 'currentTarget', { value: form })
  Object.defineProperty(changeEvent, 'target', { value: input })
  await validate(changeEvent)

  expect(input.checkValidity()).toBe(true)
  expect(checkbox.checkValidity()).toBe(false)
})

it('does not report input events when validateAllFieldsOnChange is false', async () => {
  const { checkbox, form, input } = mockForm()
  const validate = createAsyncValidator(
    formYobta(),
    shapeYobta({
      checkbox: constYobta('yobta'),
      text: constYobta('yobta'),
    }),
    validityYobta(errorHandlerMock, { validateAllFieldsOnChange: false }),
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

it('reports input events when validateAllFieldsOnChange is true', async () => {
  const { checkbox, form, input } = mockForm()
  const validate = createAsyncValidator(
    formYobta(),
    shapeYobta({
      checkbox: constYobta('yobta'),
      text: constYobta('yobta'),
    }),
    validityYobta(errorHandlerMock, { validateAllFieldsOnChange: true }),
  )
  const changeEvent = createEvent.change(input)
  Object.defineProperty(changeEvent, 'currentTarget', { value: form })
  Object.defineProperty(changeEvent, 'target', { value: input })
  expect(input.checkValidity()).toBe(true)
  expect(checkbox.checkValidity()).toBe(true)
  const result = await validate(changeEvent)
  expect(result).toEqual([null, expect.any(Array)])
  expect(input.checkValidity()).toBe(false)
  expect(checkbox.checkValidity()).toBe(false)
})

it('reports unhandled errors', async () => {
  const { form, input } = mockForm()
  const validate = createAsyncValidator(
    formYobta(),
    shapeYobta({
      inputIsNotInForm: constYobta('yobta'),
      text: constYobta('yobta'),
    }),
    validityYobta(errorHandlerMock),
  )

  expect(input.checkValidity()).toBe(true)

  const submitEvent = createEvent.submit(form)
  Object.defineProperty(submitEvent, 'currentTarget', { value: form })
  Object.defineProperty(submitEvent, 'target', { value: form })

  await validate(submitEvent)

  expect(input.checkValidity()).toBe(false)
  expect(errorHandlerMock).toHaveBeenCalledTimes(2)
  expect(errorHandlerMock.mock.calls).toEqual([
    [
      new YobtaError({
        field: 'inputIsNotInForm',
        message: 'Should be identical to "yobta"',
        path: ['inputIsNotInForm'],
      }),
    ],
    [new YobtaError({ field: '@', message: shapeMessage, path: [] })],
  ])
})

it('does not report readonly inputs', async () => {
  const { form, readonlyInput } = mockForm()
  const validate = createAsyncValidator(
    formYobta(),
    shapeYobta({
      readonly: constYobta('readonly yobta'),
    }),
    validityYobta(errorHandlerMock),
  )

  expect(readonlyInput.checkValidity()).toBe(true)

  const submitEvent = createEvent.submit(form)
  Object.defineProperty(submitEvent, 'currentTarget', { value: form })
  Object.defineProperty(submitEvent, 'target', { value: form })

  await validate(submitEvent)

  expect(readonlyInput.checkValidity()).toBe(true)
  expect(errorHandlerMock).toHaveBeenCalledTimes(2)
  expect(errorHandlerMock.mock.calls).toEqual([
    [
      new YobtaError({
        field: 'readonly',
        message: 'Should be identical to "readonly yobta"',
        path: ['readonly'],
      }),
    ],
    [new YobtaError({ field: '@', message: shapeMessage, path: [] })],
  ])
})

it('does not report hidden inputs', async () => {
  const { form, hiddenInput } = mockForm()
  const validate = createAsyncValidator(
    formYobta(),
    shapeYobta({
      hidden: constYobta('hidden yobta'),
    }),
    validityYobta(errorHandlerMock),
  )

  expect(hiddenInput.checkValidity()).toBe(true)

  const submitEvent = createEvent.submit(form)
  Object.defineProperty(submitEvent, 'currentTarget', { value: form })
  Object.defineProperty(submitEvent, 'target', { value: form })

  await validate(submitEvent)

  expect(hiddenInput.checkValidity()).toBe(true)
  expect(errorHandlerMock).toHaveBeenCalledTimes(2)
  expect(errorHandlerMock.mock.calls).toEqual([
    [
      new YobtaError({
        field: 'hidden',
        message: 'Should be identical to "hidden yobta"',
        path: ['hidden'],
      }),
    ],
    [new YobtaError({ field: '@', message: shapeMessage, path: [] })],
  ])
})
