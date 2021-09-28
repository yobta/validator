import { jest } from '@jest/globals'

import { errorsYobta } from '.'
import {
  asyncYobta,
  formDataYobta,
  requiredYobta,
  shapeYobta,
  stringYobta
} from '..'
import { YobtaError } from '../_internal/YobtaError'

it('calls reporter when validation fails', async () => {
  let formData = new FormData()
  let spy = jest.fn()
  let validate = asyncYobta(
    formDataYobta(),
    shapeYobta({ name: [stringYobta(), requiredYobta<string>()] }),
    errorsYobta(spy)
  )
  let result = await validate(formData)
  let error = new YobtaError({
    message: 'Required',
    path: ['name'],
    field: 'name'
  })

  expect(result).toEqual([null, [error]])
  expect(spy).toHaveBeenCalledWith([error], {
    data: expect.any(FormData),
    errors: [error],
    field: '@',
    path: [],
    pushError: expect.any(Function)
  })
})

it('does not call reporter when validation succeeds', async () => {
  let formData = new FormData()
  let spy = jest.fn()
  let validate = asyncYobta(
    formDataYobta(),
    shapeYobta({ name: [stringYobta()] }),
    errorsYobta(spy)
  )
  let result = await validate(formData)

  expect(result).toEqual([{ name: undefined }, null])
  expect(spy).toHaveBeenCalledTimes(0)
})
