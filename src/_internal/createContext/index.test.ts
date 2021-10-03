import { jest } from '@jest/globals'

import { createContext } from '.'

describe('createContext', () => {
  it('creates contexts without a from', () => {
    let context = createContext(null)

    expect(context).toEqual({
      data: null,
      errors: [],
      field: '@',
      path: [],
      pushError: expect.any(Function),
    })
  })

  it('prevents submit event', () => {
    let form = document.createElement('form')
    let event = new Event('submit')
    Object.defineProperty(event, 'currentTarget', { value: form })
    jest.spyOn(event, 'preventDefault')

    let context = createContext(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(context).toEqual({
      data: event,
      errors: [],
      field: '@',
      form,
      path: [],
      pushError: expect.any(Function),
    })
  })

  it('does not prevent change event', () => {
    let form = document.createElement('form')
    let input = document.createElement('input')
    let event = new Event('change')
    Object.defineProperty(event, 'currentTarget', { value: form })
    Object.defineProperty(event, 'target', { value: input })
    jest.spyOn(event, 'preventDefault')

    let context = createContext(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(0)
    expect(context).toEqual({
      data: event,
      errors: [],
      field: '@',
      form,
      input,
      path: [],
      pushError: expect.any(Function),
    })
  })

  it('prevents synthetic submit event', () => {
    let form = document.createElement('form')
    let event = {
      type: 'submit',
      constructor: { name: 'SyntheticBaseEvent' },
      currentTarget: form,
      preventDefault() {},
    }
    jest.spyOn(event, 'preventDefault')

    let context = createContext(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(context).toEqual({
      data: event,
      errors: [],
      field: '@',
      form,
      path: [],
      pushError: expect.any(Function),
    })
  })
})
