/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import { effectYobta } from '../'
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
import { syncYobta } from './'

let validate = syncYobta(numberYobta('yobta!'))

describe('asyncYobta', () => {
  it('accepts valid', () => {
    let result = validate(1)
    expect(result).toEqual([1, null])
  })

  it('can pipe rules', () => {
    let validateMultiple = syncYobta(
      stringYobta(),
      requiredYobta(),
      minCharactersYobta(5),
    )
    let result = validateMultiple('yobta')
    expect(result).toEqual(['yobta', null])
  })

  it('rejects invalid', () => {
    let attempt = (): any => validate([])
    let result = attempt()
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

  let validateSearch = syncYobta(
    urlSearchParamsYobta(),
    shapeYobta({
      currentTab: [
        catchYobta(
          'tab-1',
          enumYobta(['tab-1', 'tab-2', 'tab-3']),
          requiredYobta(),
        ),
      ],
      myModalIsOpen: [catchYobta(false, booleanYobta(), requiredYobta())],
    }),
  )

  it("creates default state when can't extract it from url", () => {
    let result = validateSearch('')
    expect(result).toEqual([
      {
        currentTab: 'tab-1',
        myModalIsOpen: false,
      },
      null,
    ])
  })

  it('extracts state from url', () => {
    expect(validateSearch('currentTab=tab-3&myModalIsOpen=true')).toEqual([
      {
        currentTab: 'tab-3',
        myModalIsOpen: true,
      },
      null,
    ])
  })

  it('captures context errors', () => {
    let error: YobtaError = {
      field: '@',
      message: 'yobta',
      name: 'error',
      path: [],
    }
    let validateContext = syncYobta(({ pushError }) => (item: any) => {
      if (typeof item !== 'string') pushError(error)
      return item
    })
    let result = validateContext(1)
    expect(result).toEqual([null, [error]])
  })

  it("prevents form submit and doesn't prevent change", () => {
    let form = document.createElement('form')
    let submitEvent = createEvent.submit(form)
    let changeEvent = createEvent.change(form)
    let validateEvent = syncYobta(requiredYobta())

    jest.spyOn(submitEvent, 'preventDefault')
    jest.spyOn(changeEvent, 'preventDefault')

    validateEvent(submitEvent)
    validateEvent(changeEvent)

    expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1)
    expect(changeEvent.preventDefault).toHaveBeenCalledTimes(0)
  })

  it('preserves yobta error', () => {
    let yobtaError = new YobtaError({
      field: 'yobta',
      message: 'yobta',
      path: [],
    })
    let result = syncYobta(
      shapeYobta({
        name: [
          effectYobta<any>(() => {
            throw yobtaError
          }),
        ],
      }),
    )({})
    expect(result).toEqual([null, [yobtaError]])
  })
})
