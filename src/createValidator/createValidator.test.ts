/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import type { YobtaContext } from '..'
import {
  boolean,
  constant,
  fallback,
  number,
  oneOf,
  pipe,
  required,
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
      pipe(
        required(),
        oneOf(() => new Set(['tab-1', 'tab-2', 'tab-3'])),
      ),
    ),
    myModalIsOpen: safe(
      false,
      boolean(),
      fallback(() => false),
    ),
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
