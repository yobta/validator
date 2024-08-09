/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { createContext } from '../_internal/createContext/createContext'
import type { YobtaAsyncRule } from '../_types/YobtaAsyncRule'
import { number } from '../number'
import type { YobtaSyncRule } from '../rule/rule'
import { string } from '../string/string'
import { asyncPipe } from './asyncPipe'

const ctx = createContext({})

const addAsync: YobtaAsyncRule<number, number> = () => async (i: number) =>
  i + 1

const add: YobtaSyncRule<number, number> = () => (i: number) => i + 1

const raiseError: YobtaSyncRule<number, never> = () => () => {
  throw new Error('Error')
}

it('pipes', async () => {
  const rule = asyncPipe(number(), addAsync, add, addAsync, string())
  const result = await rule(ctx)('1')
  expect(result).toBe('4')
})

it('rethrows error', async () => {
  const mock1 = jest.fn(add)
  const mock3 = jest.fn(addAsync)

  const rule = asyncPipe(mock1, raiseError, mock3)

  try {
    await rule(ctx)(1)
  } catch (error) {
    expect(mock1).toHaveBeenCalledTimes(1)
    expect(error).toEqual(new Error('Error'))
    expect(mock3).not.toHaveBeenCalled()
  }
})
