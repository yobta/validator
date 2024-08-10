/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import { createContext } from './createContext'

it('creates context', () => {
  const context = createContext(null)

  expect(context).toEqual({
    data: null,
    errors: [],
    event: null,
    field: '@',
    path: [],
    pushError: expect.any(Function),
    value: null,
  })
})

it('prevents submit event', async () => {
  const formNode = document.createElement('form')
  const submitEvent = createEvent.submit(formNode)
  jest.spyOn(submitEvent, 'preventDefault')

  createContext(submitEvent)

  expect(submitEvent.preventDefault).toHaveBeenCalled()
})
