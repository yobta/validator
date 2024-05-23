/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { yobta } from '../yobta'
import { effectYobta } from './'

it('calls effect and returns data unmodified', () => {
  const spy = jest.fn()
  const validate = yobta(effectYobta(spy))
  const data = {}
  const result = validate(data)
  expect(result).toBe(result)
  expect(spy).toHaveBeenCalledWith(
    {},
    {
      data: {},
      errors: [],
      event: {},
      field: '@',
      form: undefined,
      input: undefined,
      path: [],
      pushError: expect.any(Function),
    },
  )
})
