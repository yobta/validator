/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import {
  createAsyncValidator,
  createValidator,
  formYobta,
  requiredYobta,
  shapeYobta,
  stringYobta,
} from '..'
import { mockForm } from '../_internal/mockForm'
import type { YobtaAsyncValidator } from '../_types/YobtaAsyncValidator'
import type { YobtaContext } from '../_types/YobtaContext'
import { YobtaError } from '../YobtaError'
import { awaitSubmitYobta } from './'

function mockValidate(spy: Function): YobtaAsyncValidator<any, any> {
  return createAsyncValidator(
    formYobta(),
    shapeYobta({
      name: createValidator(requiredYobta(), stringYobta()),
    }),
    awaitSubmitYobta(async (data, context) => {
      spy(data, context)
    }),
  )
}

it('submits when it is valid and context has submit event', async () => {
  const spy = jest.fn()
  const validate = mockValidate(spy)
  const result = await mockForm(
    '<input type="text" name="name" value="yobta" />',
  ).submit(validate)

  expect(result).toEqual([{ name: 'yobta' }, null])

  expect(spy).toHaveBeenCalledWith(
    { name: 'yobta' },
    {
      data: expect.any(Event),
      errors: [],
      event: expect.any(Event),
      field: '@',
      form: expect.any(HTMLFormElement),
      path: [],
      pushError: expect.any(Function),
    },
  )
})

it('submits when it is valid and context has synthetic submit event', async () => {
  const spy = jest.fn()
  const validate = mockValidate(spy)
  const form = document.createElement('form')
  form.innerHTML = '<input type="text" name="name" value="yobta" />'

  const syntheticEvent = {
    currentTarget: form,
    target: form,
    type: 'submit',
  }

  const result = await validate(syntheticEvent)

  expect(result).toEqual([{ name: 'yobta' }, null])
  expect(spy).toHaveBeenCalledWith(
    { name: 'yobta' },
    {
      data: syntheticEvent,
      errors: [],
      event: syntheticEvent,
      field: '@',
      form: expect.any(HTMLFormElement),
      path: [],
      pushError: expect.any(Function),
    },
  )
})

it('does not submit data when it is valid but the event type is not submit', async () => {
  const spy = jest.fn()
  const validate = mockValidate(spy)
  const result = await mockForm(
    '<input type="text" name="name" value="yobta" />',
  ).change(validate)

  expect(result).toEqual([{ name: 'yobta' }, null])
  expect(spy).toHaveBeenCalledTimes(0)
})

it('does not fire when it is not valid and event type is submit', async () => {
  const spy = jest.fn()
  const validate = mockValidate(spy)
  const result = await mockForm('<input name="unknown" type="text" />').submit(
    validate,
  )

  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'name',
        message: 'Required',
        path: ['name'],
      }),
      new YobtaError({
        field: 'name',
        message: 'Ivalid shape',
        path: ['name'],
      }),
    ],
  ])
  expect(spy).toHaveBeenCalledTimes(0)
})

it('catches submit error and pushes it to errors', async () => {
  const pushErrorMock = jest.fn()
  const context: YobtaContext = {
    data: null,
    errors: [],
    event: {
      type: 'submit',
    },
    field: '@',
    path: [],
    pushError: pushErrorMock,
  }
  const rule = awaitSubmitYobta(async () => {
    throw new Error('Submit error')
  })
  await rule(context)(null)
  expect(pushErrorMock.mock.calls).toEqual([
    [
      new YobtaError({
        field: 'name',
        message: 'Submit error',
        path: ['name'],
      }),
    ],
  ])
})
