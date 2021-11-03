import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import { asyncYobta } from '.'
import { booleanYobta } from '../booleanYobta'
import { catchYobta } from '../catchYobta'
import { minCharactersYobta } from '../minCharactersYobta'
import { numberYobta } from '../numberYobta'
import { enumYobta } from '../enumYobta'
import { requiredYobta } from '../requiredYobta'
import { shapeYobta } from '../shapeYobta'
import { stringYobta } from '../stringYobta'
import { urlSearchParamsYobta } from '../urlSearchParamsYobta'
import { YobtaError } from '../YobtaError'
import { effectYobta } from '..'

let validate = asyncYobta(numberYobta('yobta!'))

let validateSearch = asyncYobta(
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

describe('asyncYobta', () => {
  it('accepts valid', async () => {
    let result = await validate(1)
    expect(result).toEqual([1, null])
  })

  it('can pipe rules', async () => {
    let validateMultiple = asyncYobta(
      stringYobta(),
      requiredYobta(),
      minCharactersYobta(5),
    )
    let result = await validateMultiple('yobta')
    expect(result).toEqual(['yobta', null])
  })

  it('rejects invalid', async () => {
    let attempt = async (): Promise<any> => await validate([])
    let result = await attempt()
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
    let result = await validateSearch('')
    expect(result).toEqual([
      {
        currentTab: 'tab-1',
        myModalIsOpen: false,
      },
      null,
    ])
  })

  it('extracts state from url', async () => {
    expect(await validateSearch('currentTab=tab-3&myModalIsOpen=true')).toEqual(
      [
        {
          currentTab: 'tab-3',
          myModalIsOpen: true,
        },
        null,
      ],
    )
  })

  it('captures context errors', async () => {
    let error: YobtaError = {
      name: 'error',
      message: 'yobta',
      path: [],
      field: '@',
    }
    let validateContext = asyncYobta(({ pushError }) => (item: any) => {
      if (typeof item !== 'string') pushError(error)
      return item
    })
    let result = await validateContext(1)
    expect(result).toEqual([null, [error]])
  })

  it("prevents form submit and doesn't prevent change", async () => {
    let form = document.createElement('form')
    let submitEvent = createEvent.submit(form)
    let changeEvent = createEvent.change(form)
    let validateEvent = asyncYobta(requiredYobta())

    jest.spyOn(submitEvent, 'preventDefault')
    jest.spyOn(changeEvent, 'preventDefault')

    await validateEvent(submitEvent)
    await validateEvent(changeEvent)

    expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1)
    expect(changeEvent.preventDefault).toHaveBeenCalledTimes(0)
  })

  it('preserves yobta error', async () => {
    let yobtaError = new YobtaError({
      field: 'yobta',
      message: 'yobta',
      path: [],
    })
    let result = await asyncYobta(
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
