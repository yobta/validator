import { createEvent } from '@testing-library/dom'

import { asyncYobta, requiredYobta, shapeYobta, stringYobta } from '..'
import { formYobta } from '../formYobta'
import { validityMessage, validityYobta } from '.'
import { YobtaContext } from '../_internal/createContext'

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
    let context: YobtaContext = {
      data,
      errors: [],
      field: '@',
      path: [],
      pushError() {},
    }

    expect(() => validityYobta()(context)({})).toThrow(validityMessage)
  })

  it('throws when gets a non-event and has a custom error message', () => {
    let context: YobtaContext = {
      data: 'yobta',
      errors: [],
      field: '@',
      path: [],
      pushError() {},
    }

    expect(() => validityYobta('yobta!')(context)({})).toThrow('yobta!')
  })

  it('sets validity for all errors when event target is form and resets when error is fixed', async () => {
    let { form, input, checkbox } = mockForm()
    let validate = asyncYobta(
      formYobta(),
      shapeYobta({
        text: [stringYobta(), requiredYobta<string>()],
        checkbox: [stringYobta(), requiredYobta<string>()],
      }),
      validityYobta(),
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
      validityYobta(),
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
})
