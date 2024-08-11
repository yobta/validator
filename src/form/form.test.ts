/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

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
  Object.defineProperty(event, 'target', { value: formNode })
  const result = validate(event)
  expect(result).toEqual({})
})

it('rejects invalid input', () => {
  const variants = [
    '',
    null,
    NaN,
    undefined,
    [],
    {},
    new Date(),
    0,
    1,
    true,
    false,
    'yobta',
  ]

  for (const variant of variants) {
    const attempt = (): any => validate(variant)
    expect(attempt).toThrow(formMessage)
  }
})

it('des not prevent change event', () => {
  const formNode = document.createElement('form')
  const input = document.createElement('input')
  formNode.appendChild(input)

  const event = createEvent.change(input)
  jest.spyOn(event, 'preventDefault')

  Object.defineProperty(event, 'currentTarget', { value: formNode })
  Object.defineProperty(event, 'target', { value: input })

  const result = validate(event)

  expect(event.preventDefault).toHaveBeenCalledTimes(0)
  expect(result).toEqual({})
})

it('rejects synthetic submit event', () => {
  const event = {
    constructor: { name: 'SyntheticBaseEvent' },
    currentTarget: form,
    preventDefault() {},
    type: 'submit',
  }

  expect(() => validate(event)).toThrow(formMessage)
})
