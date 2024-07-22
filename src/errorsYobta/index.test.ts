/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { asyncYobta, shapeYobta, stringYobta, yobta } from '../'
import { YobtaError } from '../YobtaError'
import { errorsYobta } from './'

it('calls reporter when validation fails', async () => {
  const spy = jest.fn()

  const validate = asyncYobta(
    shapeYobta({ yobta: yobta(stringYobta()) }),
    errorsYobta(spy),
  )

  const result = await validate({ yobta: [] })

  const error = new YobtaError({
    field: 'yobta',
    message: 'It should be a string',
    path: ['yobta'],
  })

  expect(result).toEqual([null, [error]])
})

it('does not call reporter when validation succeeds', async () => {
  const spy = jest.fn()
  const validate = asyncYobta(
    shapeYobta({ name: yobta(stringYobta()) }),
    errorsYobta(spy),
  )
  const result = await validate({})

  expect(result).toEqual([{ name: '' }, null])
  expect(spy).toHaveBeenCalledTimes(0)
})
