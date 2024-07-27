/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { createEvent } from '@testing-library/dom'

import type { YobtaContext } from '..'
import {
  boolean,
  constant,
  fallback,
  number,
  oneOf,
  rule,
  safe,
  shape,
  string,
  YobtaError,
} from '..'
import { fromEntries } from '../_internal/fromEntries'
import { createValidator } from './createValidator'

const validate = createValidator(number('yobta!'))

it('accepts valid', () => {
  const result = validate(1)
  expect(result).toBe(1)
})

it('can pipe rules', () => {
  const validateMultiple = createValidator(
    string(),
    // minCharacters(5),
  )
  const result = validateMultiple('yobta')
  expect(result).toBe('yobta')
})

it('rejects invalid', () => {
  const attempt = (): any => validate({})
  expect(attempt).toThrow('yobta!')
})

const validateSearch = createValidator(
  rule((value: any) => new URLSearchParams(value)),
  rule(fromEntries),
  shape({
    currentTab: safe(
      'tab-1',
      oneOf(() => new Set(['tab-1', 'tab-2', 'tab-3'])),
    ),
    myModalIsOpen: safe(false, boolean()),
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
  const validateEvent = createValidator(fallback(() => 0))

  jest.spyOn(submitEvent, 'preventDefault')
  jest.spyOn(changeEvent, 'preventDefault')

  validateEvent(submitEvent)
  validateEvent(changeEvent)

  expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1)
  expect(changeEvent.preventDefault).toHaveBeenCalledTimes(0)
})

it('takes external context', () => {
  const pushError = jest.fn()
  const context: YobtaContext = {
    data: 'yobta',
    errors: [],
    event: 'yobta',
    field: 'yobta',
    path: ['yobta'],
    pushError,
    value: 'yobta',
  }
  const validateWithContext = createValidator(constant(1))

  try {
    validateWithContext(2, context)
  } catch (error) {
    const yobtaError = error as YobtaError
    expect(yobtaError).toBeInstanceOf(YobtaError)
    expect(pushError).not.toHaveBeenCalled()
    expect(yobtaError.message).toBe('Should be identical to "1"')
    expect(yobtaError.field).toBe('yobta')
    expect(yobtaError.path).toEqual(['yobta'])
  }
})
