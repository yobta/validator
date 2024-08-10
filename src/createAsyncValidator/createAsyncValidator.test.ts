/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { constant, effect, pipe, required, rule } from '..'
import { createContext } from '../_internal/createContext/createContext'
import { fromEntries } from '../_internal/fromEntries'
import { boolean } from '../boolean/boolean'
import { fallback } from '../fallback/fallback'
import { number } from '../number'
import { oneOf } from '../oneOf/oneOf'
import { shape } from '../shape/shape'
import { string } from '../string'
import { minCharacters } from '../string/minCharacters'
import { YobtaError } from '../YobtaError'
import { createAsyncValidator } from './createAsyncValidator'

const validate = createAsyncValidator(number('yobta!'))

const validateSearch = createAsyncValidator(
  rule((value: any) => new URLSearchParams(value)),
  rule(fromEntries),
  shape({
    currentTab: fallback(
      'tab-1',
      pipe(
        required(),
        oneOf(() => new Set(['tab-1', 'tab-2', 'tab-3'])),
      ),
    ),
    myModalIsOpen: fallback(false, boolean()),
  }),
)

it('accepts valid', async () => {
  const result = await validate(1)
  expect(result).toEqual([1, null])
})

it('can pipe rules', async () => {
  const validateMultiple = createAsyncValidator(
    string(),
    minCharacters(() => 5),
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
      myModalIsOpen: undefined,
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
  const validateContext = createAsyncValidator(
    ({ pushError }) =>
      (item: any) => {
        if (typeof item !== 'string') pushError(error)
        return item
      },
  )
  const result = await validateContext(1)
  expect(result).toEqual([null, [error]])
})

it('respects foreign context', async () => {
  const foreignContext = createContext({})
  jest.spyOn(foreignContext, 'pushError')
  const validateConst = createAsyncValidator(constant(1))
  await validateConst(2, foreignContext)
  expect(foreignContext.pushError).toHaveBeenCalledTimes(1)
})

it('preserves yobta error', async () => {
  const yobtaError = new YobtaError({
    field: 'yobta',
    message: 'yobta',
    path: [],
  })
  const result = await createAsyncValidator(
    shape({
      name: effect(() => {
        throw yobtaError
      }),
    }),
  )({})
  expect(result).toEqual([
    null,
    [
      yobtaError,
      new YobtaError({
        field: 'yobta',
        message: 'Ivalid shape',
        path: [],
      }),
    ],
  ])
})
