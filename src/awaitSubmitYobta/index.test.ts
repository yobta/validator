/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { awaitSubmitYobta } from './'
import {
  asyncYobta,
  AsyncYobtaRule,
  formYobta,
  requiredYobta,
  shapeYobta,
  stringYobta,
} from '..'
import { mockForm } from '../_internal/mockForm'
import { YobtaError } from '../YobtaError'
import { YobtaContext } from '../_internal/createContext'

function mockValidate(spy: Function): AsyncYobtaRule<any, any> {
  return asyncYobta(
    formYobta(),
    shapeYobta({
      name: [stringYobta(), requiredYobta<string>()],
    }),
    requiredYobta(),
    awaitSubmitYobta(async (data, context) => {
      spy(data, context)
    }),
  )
}

describe('awaitSubmitYobta', () => {
  it('submits when it is valid and context has submit event', async () => {
    let spy = jest.fn()
    let validate = mockValidate(spy)
    let result = await mockForm(
      '<input type="text" name="name" value="yobta" />',
    ).submit(validate)

    expect(result).toEqual([{ name: 'yobta' }, null])

    expect(spy).toHaveBeenCalledWith(
      { name: 'yobta' },
      {
        data: expect.any(Event),
        event: expect.any(Event),
        errors: [],
        field: '@',
        form: expect.any(HTMLFormElement),
        path: [],
        pushError: expect.any(Function),
      },
    )
  })
  it('submits when it is valid and context has synthetic submit event', async () => {
    let spy = jest.fn()
    let validate = mockValidate(spy)
    let form = document.createElement('form')
    form.innerHTML = '<input type="text" name="name" value="yobta" />'

    let syntheticEvent = {
      currentTarget: form,
      type: 'submit',
      target: form,
    }

    let result = await validate(syntheticEvent)

    expect(result).toEqual([{ name: 'yobta' }, null])
    expect(spy).toHaveBeenCalledWith(
      { name: 'yobta' },
      {
        data: syntheticEvent,
        event: syntheticEvent,
        errors: [],
        field: '@',
        form: expect.any(HTMLFormElement),
        path: [],
        pushError: expect.any(Function),
      },
    )
  })

  it('does not submit data when it is valid but the event type is not submit', async () => {
    let spy = jest.fn()
    let validate = mockValidate(spy)
    let result = await mockForm(
      '<input type="text" name="name" value="yobta" />',
    ).change(validate)

    expect(result).toEqual([{ name: 'yobta' }, null])
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('does not fire when it is not valid and event type is submit', async () => {
    let spy = jest.fn()
    let validate = mockValidate(spy)
    let result = await mockForm('<input name="name" type="text" />').submit(
      validate,
    )

    let error = new YobtaError({
      message: 'Required',
      path: ['name'],
      field: 'name',
    })

    expect(result).toEqual([null, [error]])
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('catches submit error and pushes it to errors', async () => {
    let context: YobtaContext = {
      data: null,
      event: {
        type: 'submit',
      },
      errors: [],
      field: '@',
      path: [],
      pushError: jest.fn(),
    }
    let rule = awaitSubmitYobta(async () => {
      throw new Error('Submit error')
    })
    await rule(context)(null)
    expect(context.pushError).toHaveBeenCalledWith(Error('Submit error'))
  })
})
