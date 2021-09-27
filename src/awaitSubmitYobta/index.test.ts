import { jest } from '@jest/globals'

import { awaitSubmitYobta } from '.'
import {
  asyncYobta,
  formDataYobta,
  requiredYobta,
  shapeYobta,
  stringYobta,
  YobtaError
} from '..'

function mockValidate(
  type: string,
  spy: Function,
  value: string
): Promise<any> {
  let event = new Event(type)
  let form = document.createElement('form')
  let input = document.createElement('input')
  input.setAttribute('name', 'name')
  input.setAttribute('value', value)
  form.appendChild(input)

  Object.defineProperty(event, 'currentTarget', {
    writable: false,
    value: form
  })

  let validate = asyncYobta(
    formDataYobta(),
    shapeYobta({
      name: [stringYobta(), requiredYobta<string>()]
    }),
    requiredYobta(),
    awaitSubmitYobta(async (data, context) => {
      spy(data, context)
    })
  )

  let result = validate(event)

  return result
}

it('submits data and context when it is valid and event type is submit', async () => {
  let spy = jest.fn()

  let result = await mockValidate('submit', spy, 'yobta')

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

  let result = await mockValidate('change', spy, 'yobta')

  expect(result).toEqual([{ name: 'yobta' }, null])

  expect(spy).toHaveBeenCalledTimes(0)
})

it('does not fire when it is not valid and event type is submit', async () => {
  let spy = jest.fn()

  let result = await mockValidate('change', spy, '')

  let error = new YobtaError({
    message: 'Required',
    path: ['name'],
    field: 'name'
  })

  expect(result).toEqual([null, [error]])

  expect(spy).toHaveBeenCalledTimes(0)
})
