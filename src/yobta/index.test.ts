/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import {
  booleanYobta,
  catchYobta,
  enumYobta,
  minCharactersYobta,
  numberYobta,
  requiredYobta,
  shapeYobta,
  stringYobta,
  urlSearchParamsYobta,
} from '../'
import { yobta } from './'

let validate = yobta(numberYobta('yobta!'))

it('accepts valid', () => {
  let result = validate(1)
  expect(result).toBe(1)
})

it('can pipe rules', () => {
  let validateMultiple = yobta(
    stringYobta(),
    requiredYobta(),
    minCharactersYobta(5),
  )
  let result = validateMultiple('yobta')
  expect(result).toBe('yobta')
})

it('rejects invalid', () => {
  let attempt = (): any => validate([])
  expect(attempt).toThrow('yobta!')
})

let validateSearch = yobta(
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
  expect(validateSearch('')).toEqual({
    currentTab: 'tab-1',
    myModalIsOpen: false,
  })
})

it('extracts state from url', () => {
  expect(validateSearch('currentTab=tab-3&myModalIsOpen=true')).toEqual({
    currentTab: 'tab-3',
    myModalIsOpen: true,
  })
})

it("prevents form submit and doesn't prevent change", () => {
  let form = document.createElement('form')
  let submitEvent = createEvent.submit(form)
  let changeEvent = createEvent.change(form)
  let validateEvent = yobta(requiredYobta())

  jest.spyOn(submitEvent, 'preventDefault')
  jest.spyOn(changeEvent, 'preventDefault')

  validateEvent(submitEvent)
  validateEvent(changeEvent)

  expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1)
  expect(changeEvent.preventDefault).toHaveBeenCalledTimes(0)
})
