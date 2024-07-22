/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import { effectYobta, yobta } from '../'
import { booleanYobta } from '../booleanYobta'
import { catchYobta } from '../catchYobta'
import { enumYobta } from '../enumYobta'
import { minCharactersYobta } from '../minCharactersYobta'
import { numberYobta } from '../numberYobta'
import { requiredYobta } from '../requiredYobta'
import { shapeYobta } from '../shapeYobta'
import { stringYobta } from '../stringYobta'
import { urlSearchParamsYobta } from '../urlSearchParamsYobta'
import { YobtaError } from '../YobtaError'
import { asyncYobta } from './'

const validate = asyncYobta(numberYobta('yobta!'))

const validateSearch = asyncYobta(
  urlSearchParamsYobta(),
  shapeYobta({
    currentTab: yobta(
      catchYobta(
        'tab-1',
        enumYobta(new Set(['tab-1', 'tab-2', 'tab-3'])),
        requiredYobta(),
      ),
    ),
    myModalIsOpen: yobta(catchYobta(false, booleanYobta(), requiredYobta())),
  }),
)

it('accepts valid', async () => {
  const result = await validate(1)
  expect(result).toEqual([1, null])
})

it('can pipe rules', async () => {
  const validateMultiple = asyncYobta(
    stringYobta(),
    requiredYobta(),
    minCharactersYobta(5),
  )
  const result = await validateMultiple('yobta')
  expect(result).toEqual(['yobta', null])
})

it('rejects invalid', async () => {
  const attempt = async (): Promise<any> => await validate({})
  const result = await attempt()
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: '@',
        message: 'yobta!',
        path: [],
      }),
    ],
  ])
})

it("creates default state when can't extract it from url", async () => {
  const result = await validateSearch('')
  expect(result).toEqual([
    {
      currentTab: 'tab-1',
      myModalIsOpen: false,
    },
    null,
  ])
})

it('extracts state from url', async () => {
  expect(await validateSearch('currentTab=tab-3&myModalIsOpen=true')).toEqual([
    {
      currentTab: 'tab-3',
      myModalIsOpen: true,
    },
    null,
  ])
})

it('captures context errors', async () => {
  const error: YobtaError = {
    field: '@',
    message: 'yobta',
    name: 'error',
    path: [],
  }
  const validateContext = asyncYobta(({ pushError }) => (item: any) => {
    if (typeof item !== 'string') pushError(error)
    return item
  })
  const result = await validateContext(1)
  expect(result).toEqual([null, [error]])
})

it("prevents form submit and doesn't prevent change", async () => {
  const form = document.createElement('form')
  const submitEvent = createEvent.submit(form)
  const changeEvent = createEvent.change(form)
  const validateEvent = asyncYobta(requiredYobta())

  jest.spyOn(submitEvent, 'preventDefault')
  jest.spyOn(changeEvent, 'preventDefault')

  await validateEvent(submitEvent)
  await validateEvent(changeEvent)

  expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1)
  expect(changeEvent.preventDefault).toHaveBeenCalledTimes(0)
})

it('preserves yobta error', async () => {
  const yobtaError = new YobtaError({
    field: 'yobta',
    message: 'yobta',
    path: [],
  })
  const result = await asyncYobta(
    shapeYobta({
      name: yobta(
        effectYobta<any>(() => {
          throw yobtaError
        }),
      ),
    }),
    requiredYobta(),
  )({})
  expect(result).toEqual([null, [yobtaError]])
})
