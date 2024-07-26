/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { createAsyncValidator, shape, string } from '../'
import { YobtaError } from '../YobtaError'
import { errorsYobta } from './'

it('calls reporter when validation fails', async () => {
  const spy = jest.fn()

  const validate = createAsyncValidator(
    shape({ yobta: string() }),
    errorsYobta(spy),
  )

  const result = await validate({ yobta: [] })

  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: 'yobta',
        message: 'It should be a string',
        path: ['yobta'],
      }),
      new YobtaError({
        field: '@',
        message: 'Ivalid shape',
        path: ['@'],
      }),
    ],
  ])
})

it('does not call reporter when validation succeeds', async () => {
  const spy = jest.fn()
  const validate = createAsyncValidator(
    shape({ name: string() }),
    errorsYobta(spy),
  )
  const result = await validate({})

  expect(result).toEqual([{ name: '' }, null])
  expect(spy).toHaveBeenCalledTimes(0)
})
