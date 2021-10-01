import { jest } from '@jest/globals'

import { yobta } from '../yobta'
import { effectYobta } from '.'
import { YobtaContext } from '../_internal/YobtaContext'

it('calls effect and returns data unmodified', () => {
  let spy = jest.fn()
  let validate = yobta(effectYobta(spy))
  let data = {}
  let context: YobtaContext = {
    data,
    errors: [],
    field: '@',
    path: [],
    pushError: expect.any(Function),
  }
  let result = validate(data)
  expect(result).toBe(result)
  expect(spy).toHaveBeenCalledWith({}, context)
})
