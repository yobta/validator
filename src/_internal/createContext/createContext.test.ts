/* eslint-disable import/extensions */

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
