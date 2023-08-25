/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import type { SyncYobtaRule } from '../'
import { stringMessage, stringYobta, yobta } from '../'
import { successYobta } from './'

function mockValidate(spy: Function): SyncYobtaRule<any, any> {
  return yobta(
    stringYobta(),
    successYobta((data, context) => {
      spy(data, context)
    }),
  )
}

it('fires when it is valid', async () => {
  let spy = jest.fn()
  let validate = mockValidate(spy)
  let result = validate('yobta')

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
  let spy = jest.fn()
  let validate = mockValidate(spy)

  expect(() => validate({})).toThrow(stringMessage)
  expect(spy).toHaveBeenCalledTimes(0)
})
