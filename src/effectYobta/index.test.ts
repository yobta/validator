import { jest } from '@jest/globals'

import { yobta } from '../yobta'
import { effectYobta } from '.'

it('calls effect and returns data unmodified', () => {
  let spy = jest.fn()
  let validate = yobta(effectYobta(spy))
  let data = {}
  let result = validate(data)
  expect(result).toBe(result)
  expect(spy).toHaveBeenCalledTimes(1)
})
