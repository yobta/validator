/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { stringMessage, stringYobta, createValidator } from '../'
import type { SyncValidatorYobta } from '../_types/SyncValidatorYobta'
import { successYobta } from './'

function mockValidate(spy: Function): SyncValidatorYobta<any, any> {
  return createValidator(
    stringYobta(),
    successYobta((data, context) => {
      spy(data, context)
    }),
  )
}

it('fires when it is valid', async () => {
  const spy = jest.fn()
  const validate = mockValidate(spy)
  const result = validate('yobta')

  expect(result).toEqual('yobta')
  expect(spy).toHaveBeenCalledWith('yobta', {
    data: 'yobta',
    errors: [],
    event: 'yobta',
    field: '@',
    path: [],
    pushError: expect.any(Function),
  })
})

it('does not fire when invalid', async () => {
  const spy = jest.fn()
  const validate = mockValidate(spy)

  expect(() => validate({})).toThrow(stringMessage)
  expect(spy).toHaveBeenCalledTimes(0)
})
