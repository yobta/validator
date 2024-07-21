/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import {
  booleanYobta,
  catchYobta,
  enumYobta,
  numberYobta,
  requiredYobta,
  shapeYobta,
  stringYobta,
  urlSearchParamsYobta,
} from '../'
import { yobta } from './'

const validate = yobta(numberYobta('yobta!'))

it('accepts valid', () => {
  const result = validate(1)
  expect(result).toBe(1)
})

it('can pipe rules', () => {
  const validateMultiple = yobta(
    stringYobta(),
    requiredYobta(),
    // minCharactersYobta(5),
  )
  const result = validateMultiple('yobta')
  expect(result).toBe('yobta')
})

it('rejects invalid', () => {
  const attempt = (): any => validate({})
  expect(attempt).toThrow('yobta!')
})

const validateSearch = yobta(
  urlSearchParamsYobta(),
  shapeYobta({
    currentTab: [
      catchYobta(
        'tab-1',
        enumYobta(new Set(['tab-1', 'tab-2', 'tab-3'])),
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
  const form = document.createElement('form')
  const submitEvent = createEvent.submit(form)
  const changeEvent = createEvent.change(form)
  const validateEvent = yobta(requiredYobta())

  jest.spyOn(submitEvent, 'preventDefault')
  jest.spyOn(changeEvent, 'preventDefault')

  validateEvent(submitEvent)
  validateEvent(changeEvent)

  expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1)
  expect(changeEvent.preventDefault).toHaveBeenCalledTimes(0)
})
