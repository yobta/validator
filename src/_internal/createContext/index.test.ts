/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { createContext } from './'

describe('createContext', () => {
  it('creates contexts without a from', () => {
    const context = createContext(null)

    expect(context).toEqual({
      data: null,
      errors: [],
      event: null,
      field: '@',
      path: [],
      pushError: expect.any(Function),
    })
  })

  it('prevents submit event', () => {
    const form = document.createElement('form')
    const event = new Event('submit')
    Object.defineProperty(event, 'currentTarget', { value: form })
    jest.spyOn(event, 'preventDefault')

    const context = createContext(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(context).toEqual({
      data: event,
      errors: [],
      event,
      field: '@',
      form,
      path: [],
      pushError: expect.any(Function),
    })
  })

  it('does not prevent change event', () => {
    const form = document.createElement('form')
    const input = document.createElement('input')
    const event = new Event('change')
    Object.defineProperty(event, 'currentTarget', { value: form })
    Object.defineProperty(event, 'target', { value: input })
    jest.spyOn(event, 'preventDefault')

    const context = createContext(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(0)
    expect(context).toEqual({
      data: event,
      errors: [],
      event,
      field: '@',
      form,
      input,
      path: [],
      pushError: expect.any(Function),
    })
  })

  it('prevents synthetic submit event', () => {
    const form = document.createElement('form')
    const event = {
      constructor: { name: 'SyntheticBaseEvent' },
      currentTarget: form,
      preventDefault() {},
      type: 'submit',
    }
    jest.spyOn(event, 'preventDefault')

    const context = createContext(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(context).toEqual({
      data: event,
      errors: [],
      event,
      field: '@',
      form,
      path: [],
      pushError: expect.any(Function),
    })
  })
})
