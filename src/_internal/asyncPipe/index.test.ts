/* eslint-disable import/extensions */
import { jest } from '@jest/globals'
import { delay } from 'nanodelay'

import { asyncPipe } from './'

const addOne = (input: number): number => input + 1
const subtractOne = async (input: number): Promise<number> =>
  await Promise.resolve(input - 1)
const toString = (input: number): string => input.toString()

describe('asyncPipe', () => {
  it('pipes one function', async () => {
    const result = await asyncPipe(addOne)(0)
    expect(result).toBe(1)
  })

  it('pipes two functions', async () => {
    const result = await asyncPipe(addOne, subtractOne)(0)
    expect(result).toBe(0)
  })

  it('pipes many functions', async () => {
    const result = await asyncPipe(addOne, subtractOne, addOne, toString)(0)
    expect(result).toBe('1')
  })

  it('has no racing condition', async () => {
    const spy = jest.fn()
    const validate = asyncPipe(
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
    const result = await validate(0)

    expect(result).toBe(3)

    expect(spy).toHaveBeenNthCalledWith(1, 0)
    expect(spy).toHaveBeenNthCalledWith(2, 1)
    expect(spy).toHaveBeenNthCalledWith(3, 2)
  })
})
