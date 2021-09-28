import { jest } from '@jest/globals'

import { awaitSubmitYobta } from '.'
import {
  asyncYobta,
  AsyncYobtaRule,
  formYobta,
  requiredYobta,
  shapeYobta,
  stringYobta
} from '..'
import { mockForm } from '../_internal/mockForm'
import { YobtaError } from '../_internal/YobtaError'

function mockValidate(spy: Function): AsyncYobtaRule<any, any> {
  return asyncYobta(
    formYobta(),
    shapeYobta({
      name: [stringYobta(), requiredYobta<string>()]
    }),
    requiredYobta(),
    awaitSubmitYobta(async (data, context) => {
      spy(data, context)
    })
  )
}

it('submits data and context when it is valid and event type is submit', async () => {
  let spy = jest.fn()
  let validate = mockValidate(spy)
  let result = await mockForm(
    '<input type="text" name="name" value="yobta" />'
  ).submit(validate)

  expect(result).toEqual([{ name: 'yobta' }, null])

  expect(spy).toHaveBeenCalledWith(
    { name: 'yobta' },
    {
      data: expect.any(Event),
      errors: [],
      field: '@',
      path: [],
      pushError: expect.any(Function)
    }
  )
})

it('does not submit data when it is valid but the event type is not submit', async () => {
  let spy = jest.fn()
  let validate = mockValidate(spy)
  let result = await mockForm(
    '<input type="text" name="name" value="yobta" />'
  ).change(validate)

  expect(result).toEqual([{ name: 'yobta' }, null])

  expect(spy).toHaveBeenCalledTimes(0)
})

it('does not fire when it is not valid and event type is submit', async () => {
  let spy = jest.fn()
  let validate = mockValidate(spy)
  let result = await mockForm('<input name="name" type="text" />').submit(
    validate
  )

  let error = new YobtaError({
    message: 'Required',
    path: ['name'],
    field: 'name'
  })

  expect(result).toEqual([null, [error]])

  expect(spy).toHaveBeenCalledTimes(0)
})
