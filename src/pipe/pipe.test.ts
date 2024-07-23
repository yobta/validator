/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import { createContext } from '../_internal/createContext'
import type { YobtaSyncRule } from '../ruleYobta'
import { pipe } from './pipe'

const ctx = createContext({})

const add: YobtaSyncRule<number, number> = () => (i: number) => i + 1
const raiseError: YobtaSyncRule<number, number> = () => () => {
  throw new Error('Error')
}

it('pipes', () => {
  const rule = pipe(add, add, add)
  const result = rule(ctx)(1)
  expect(result).toBe(4)
})

it('rethrows error', () => {
  const mock1 = jest.fn(add)
  const mock2 = jest.fn(raiseError)
  const mock3 = jest.fn(add)

  const rule = pipe(mock1, mock2, mock3)

  expect(() => rule(ctx)(1)).toThrow('Error')

  expect(mock1).toHaveBeenCalledTimes(1)
  expect(mock2).toHaveBeenCalledTimes(1)
  expect(mock3).not.toHaveBeenCalled()
})
