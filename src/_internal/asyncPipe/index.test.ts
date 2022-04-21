/* eslint-disable import/extensions */
import { delay } from 'nanodelay'
import { jest } from '@jest/globals'

import { asyncPipe } from './'

const addOne = (input: number): number => input + 1
const subtractOne = async (input: number): Promise<number> =>
  await Promise.resolve(input - 1)
const toString = (input: number): string => input.toString()

describe('asyncPipe', () => {
  it('pipes one function', async () => {
    let result = await asyncPipe(addOne)(0)
    expect(result).toBe(1)
  })

  it('pipes two functions', async () => {
    let result = await asyncPipe(addOne, subtractOne)(0)
    expect(result).toBe(0)
  })

  it('pipes many functions', async () => {
    let result = await asyncPipe(addOne, subtractOne, addOne, toString)(0)
    expect(result).toBe('1')
  })

  it('has no racing condition', async () => {
    let spy = jest.fn()
    let validate = asyncPipe(
      (a: number) => {
        spy(a)
        return 1
      },
      async (a: number) => {
        await delay(16)
        spy(a)
        return 2
      },
      (a: number) => {
        spy(a)
        return 3
      },
    )
    let result = await validate(0)

    expect(result).toBe(3)

    expect(spy).toHaveBeenNthCalledWith(1, 0)
    expect(spy).toHaveBeenNthCalledWith(2, 1)
    expect(spy).toHaveBeenNthCalledWith(3, 2)
  })
})
