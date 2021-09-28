import { jest } from '@jest/globals'

import { errorsYobta } from '.'
import {
  asyncYobta,
  formYobta,
  requiredYobta,
  shapeYobta,
  stringYobta
} from '..'
import { mockForm } from '../_internal/mockForm'
import { YobtaError } from '../_internal/YobtaError'

it('calls reporter when validation fails', async () => {
  let spy = jest.fn()
  let validate = asyncYobta(
    formYobta(),
    shapeYobta({ name: [stringYobta(), requiredYobta<string>()] }),
    errorsYobta(spy)
  )
  let result = await mockForm('').submit(validate)
  let error = new YobtaError({
    message: 'Required',
    path: ['name'],
    field: 'name'
  })

  expect(result).toEqual([null, [error]])
  expect(spy).toHaveBeenCalledWith([error], {
    data: expect.any(Event),
    errors: [error],
    field: '@',
    path: [],
    pushError: expect.any(Function)
  })
})

it('does not call reporter when validation succeeds', async () => {
  let spy = jest.fn()
  let validate = asyncYobta(
    formYobta(),
    shapeYobta({ name: [stringYobta()] }),
    errorsYobta(spy)
  )
  let result = await mockForm('').submit(validate)

  expect(result).toEqual([{ name: undefined }, null])
  expect(spy).toHaveBeenCalledTimes(0)
})
