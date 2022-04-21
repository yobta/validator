/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { errorsYobta } from './'
import {
  asyncYobta,
  formYobta,
  requiredYobta,
  shapeYobta,
  stringYobta,
} from '../'
import { mockForm } from '../_internal/mockForm'
import { YobtaError } from '../YobtaError'

describe('errorsYobta', () => {
  it('calls reporter when validation fails', async () => {
    let spy = jest.fn()
    let validate = asyncYobta(
      formYobta(),
      shapeYobta({ yobta: [stringYobta(), requiredYobta<string>()] }),
      errorsYobta(spy),
    )
    let result = await mockForm('<input name="yobta" />').submit(validate)
    let error = new YobtaError({
      message: 'Required',
      path: ['yobta'],
      field: 'yobta',
    })

    expect(result).toEqual([null, [error]])
  })

  it('does not call reporter when validation succeeds', async () => {
    let spy = jest.fn()
    let validate = asyncYobta(
      formYobta(),
      shapeYobta({ name: [stringYobta()] }),
      errorsYobta(spy),
    )
    let result = await mockForm('').submit(validate)

    expect(result).toEqual([{ name: '' }, null])
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
