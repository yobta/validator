/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import {
  asyncYobta,
  formYobta,
  requiredYobta,
  shapeYobta,
  stringYobta,
} from '../'
import { mockForm } from '../_internal/mockForm'
import { YobtaError } from '../YobtaError'
import { errorsYobta } from './'

describe('errorsYobta', () => {
  it('calls reporter when validation fails', async () => {
    const spy = jest.fn()
    const validate = asyncYobta(
      formYobta(),
      shapeYobta({ yobta: [stringYobta(), requiredYobta<string>()] }),
      errorsYobta(spy),
    )
    const result = await mockForm('<input name="yobta" />').submit(validate)
    const error = new YobtaError({
      field: 'yobta',
      message: 'Required',
      path: ['yobta'],
    })

    expect(result).toEqual([null, [error]])
  })

  it('does not call reporter when validation succeeds', async () => {
    const spy = jest.fn()
    const validate = asyncYobta(
      formYobta(),
      shapeYobta({ name: [stringYobta()] }),
      errorsYobta(spy),
    )
    const result = await mockForm('').submit(validate)

    expect(result).toEqual([{ name: '' }, null])
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
